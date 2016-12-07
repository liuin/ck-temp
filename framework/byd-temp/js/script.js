/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.3
  //lazyload
  $("img.lazy").lazyload({
    effect : "fadeIn"
  });
 *
 */

(function($, window, document, undefined) {
  var $window = $(window);

  $.fn.lazyload = function(options) {
    var elements = this;
    var $container;
    var settings = {
      threshold: 0,
      failure_limit: 0,
      event: "scroll",
      effect: "show",
      container: window,
      data_attribute: "original",
      skip_invisible: true,
      appear: null,
//      callBack:function  () {
//      },
      load: null,
      placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
    };

    function update() {
      var counter = 0;
      elements.each(function() {
        var $this = $(this);

        if (settings.skip_invisible && !$this.is(":visible") && !$this.data("samllpic")) {
          return;
        }
        if ($.abovethetop(this, settings) ||
          $.leftofbegin(this, settings)) {
          /* Nothing. */
        } else if (!$.belowthefold(this, settings) &&
          !$.rightoffold(this, settings)) {
          $this.trigger("appear");
          /* if we found an image we'll load, reset the counter */
          counter = 0;
        } else {
          if (++counter > settings.failure_limit) {
            return false;
          }
        }
      });

    }

    if (options) {
      /* Maintain BC for a couple of versions. */
      if (undefined !== options.failurelimit) {
        options.failure_limit = options.failurelimit;
        delete options.failurelimit;
      }
      if (undefined !== options.effectspeed) {
        options.effect_speed = options.effectspeed;
        delete options.effectspeed;
      }

      $.extend(settings, options);
    }

    /* Cache container as jQuery as object. */
    $container = (settings.container === undefined ||
      settings.container === window) ? $window : $(settings.container);

    /* Fire one scroll event per scroll. Not one scroll event per image. */
    if (0 === settings.event.indexOf("scroll")) {
      $container.bind(settings.event, function() {
        return update();
      });
    }

    this.each(function() {
      var self = this;
      var $self = $(self);

      self.loaded = false;

    
      /* If no src attribute given use data:uri. */
      if ($self.attr("src") === undefined || $self.attr("src") === false) {
        if ($self.is("img")) {
          $self.attr("src", settings.placeholder);
        }
      }

      /* When appear is triggered load original image. */
      $self.one("appear", function() {
        if (!this.loaded) {
          if (settings.appear) {
            var elements_left = elements.length;
            settings.appear.call(self, elements_left, settings);
          }
          $("<img />")
            .bind("load", function() {
              var original = $self.attr("data-" + settings.data_attribute);
              $self.hide();
              if ($self.is("img")) {
                $self.attr("src", original);
              } else {
                $self.css("background-image", "url('" + original + "')");        
                if ($self.find('> .row').length > 0) {
                  $self.find('> .row').css("background-image", "url('" + original + "')");
                }

                $self.addClass('readyimg');
              }

              if (settings.callBack) {
                settings.callBack($self);
              }
              $self[settings.effect](settings.effect_speed);

              self.loaded = true;

              /* Remove image from array so it is not looped next time. */
              var temp = $.grep(elements, function(element) {
                return !element.loaded;
              });
              elements = $(temp);

              if (settings.load) {
                var elements_left = elements.length;
                settings.load.call(self, elements_left, settings);
              }
            })
            .attr("src", $self.attr("data-" + settings.data_attribute));
        }
      });

      /* When wanted event is triggered load original image */
      /* by triggering appear.                              */
      if (0 !== settings.event.indexOf("scroll")) {
        $self.bind(settings.event, function() {
          if (!self.loaded) {
            $self.trigger("appear");
          }
        });
      }
    });

    /* Check if something appears when window is resized. */
    $window.bind("resize", function() {
      update();
    });

    /* With IOS5 force loading images when navigating with back button. */
    /* Non optimal workaround. */
    if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
      $window.bind("pageshow", function(event) {
        if (event.originalEvent && event.originalEvent.persisted) {
          elements.each(function() {
            $(this).trigger("appear");
          });
        }
      });
    }

    /* Force initial check if images should appear. */
    $(document).ready(function() {
      setTimeout(
        function() {
          update();
        }, 100)
      update();
    });

    return this;
  };

  /* Convenience methods in jQuery namespace.           */
  /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

  $.belowthefold = function(element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
      fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
    } else {
      fold = $(settings.container).offset().top + $(settings.container).height();
    }

    return fold <= $(element).offset().top - settings.threshold;
  };

  $.rightoffold = function(element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
      fold = $window.width() + $window.scrollLeft();
    } else {
      fold = $(settings.container).offset().left + $(settings.container).width();
    }

    return fold <= $(element).offset().left - settings.threshold;
  };

  $.abovethetop = function(element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
      fold = $window.scrollTop();
    } else {
      fold = $(settings.container).offset().top;
    }

    return fold >= $(element).offset().top + settings.threshold + $(element).height();
  };

  $.leftofbegin = function(element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
      fold = $window.scrollLeft();
    } else {
      fold = $(settings.container).offset().left;
    }

    return fold >= $(element).offset().left + settings.threshold + $(element).width();
  };

  $.inviewport = function(element, settings) {
    return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
      !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
  };

  /* Custom selectors for your convenience.   */
  /* Use as $("img:below-the-fold").something() or */
  /* $("img").filter(":below-the-fold").something() which is faster */

  $.extend($.expr[":"], {
    "below-the-fold": function(a) {
      return $.belowthefold(a, {
        threshold: 0
      });
    },
    "above-the-top": function(a) {
      return !$.belowthefold(a, {
        threshold: 0
      });
    },
    "right-of-screen": function(a) {
      return $.rightoffold(a, {
        threshold: 0
      });
    },
    "left-of-screen": function(a) {
      return !$.rightoffold(a, {
        threshold: 0
      });
    },
    "in-viewport": function(a) {
      return $.inviewport(a, {
        threshold: 0
      });
    },
    /* Maintain BC for couple of versions. */
    "above-the-fold": function(a) {
      return !$.belowthefold(a, {
        threshold: 0
      });
    },
    "right-of-fold": function(a) {
      return $.rightoffold(a, {
        threshold: 0
      });
    },
    "left-of-fold": function(a) {
      return !$.rightoffold(a, {
        threshold: 0
      });
    }
  });

})(jQuery, window, document);


$(".imglazy").lazyload({
  //effect: "fadeIn",
  callBack:function  (obj) {
    obj.addClass('imglazy-ready')
    
  }
});

(function() {
  var formSting = '[data-form="select"]';
  var Select = function  (number) {
    this.id = number;
  }

  Select.prototype.build = function  (el) {
    var $this = $(el);
    $this.css("opacity","0");
    $this.wrap("<span class='selectstyle'></span>");
    var gettxt = '<span class="val textb" >'+ $this.find("option:eq(0)").html()+'<i class="none"></i></span>';
    gettxt = $(gettxt);
    gettxt.insertBefore($this);
    $this.parents(".selectstyle").addClass("select-"+ this.id);
    $this.on("change.resize",function  () {
      var vl = $(this).find("option:selected").html();
      $(this).prev('.val').html(vl);
      $(this).parents(".selectstyle").find('.val').html(vl);

      var ind = $(this).find("option:selected").index();

      if (ind == 0) {
        $(this).parents(".selectstyle").find('.val').addClass('firstval');
      }else{
        $(this).parents(".selectstyle").find('.val').removeClass('firstval');
      }

    })
    $this.trigger('change.resize');
  }

  function Plugin(option) {
    return this.each(function (n) {
      var $this   = $(this)
      var number = $this.attr('id') || n
      var data    = $this.data('ck.select')
      var options = typeof option == 'object' && option
      if (!data) $this.data('ck.select', (data = new Select(number)))
      if (option == 'build') data.build($(this))
      else if (option) data.setState(option)
    })
  }

  Select.init = function  () {
    var $this = $(formSting);
    Plugin.call($this,'build');
  }

  $(document).ready(function() {
    var $this = $(formSting);
    Plugin.call($this,'build');
  })

  $.fn.formSelect = function  (options) {
    var $this = $(this);
    Plugin.call($this,'build');
  }

})()
