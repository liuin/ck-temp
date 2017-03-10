require 'ruble'

bundle do |bundle|
  bundle.display_name = t(:bundle_name)
  bundle.author = 'Jonathan Chaffer'
  bundle.contact_email_rot_13 = 'wpunssre@fgehpghervagrenpgvir.pbz'
  bundle.description ='Support for the <a href="http://jquery.com/">jQuery JavaScript library</a>.'
  bundle.repository = 'git://github.com/aptana/javascript-jquery.ruble.git'
  
  bundle.project_build_path["jQuery 2.0"] = "#{File.dirname($0)}"+File::SEPARATOR+"support"+File::SEPARATOR+"jquery.2.sdocml"
  bundle.project_build_path["jQuery 1.8"] = "#{File.dirname($0)}"+File::SEPARATOR+"support"+File::SEPARATOR+"jquery.1.8.sdocml"
  bundle.project_build_path["zepto 1.1.3"] = "#{File.dirname($0)}"+File::SEPARATOR+"support"+File::SEPARATOR+"zepto.1.1.3.sdocml"
  bundle.project_build_path["mui 0.5.4"] = "#{File.dirname($0)}"+File::SEPARATOR+"support"+File::SEPARATOR+"mui.0.5.4.sdocml"
  bundle.project_build_path["weixin 1.0.0"] = "#{File.dirname($0)}"+File::SEPARATOR+"support"+File::SEPARATOR+"weixin.1.0.0.sdocml"
  bundle.project_build_path["angular 1.x"] = "#{File.dirname($0)}"+File::SEPARATOR+"support"+File::SEPARATOR+"angularjs.1.x.sdocml"
  bundle.project_build_path["bootstrap 3.x"] = "#{File.dirname($0)}"+File::SEPARATOR+"support"+File::SEPARATOR+"bootstrap.js.sdocml"
  bundle.project_build_path["jQuery.mobile 1.5"] = "#{File.dirname($0)}"+File::SEPARATOR+"support"+File::SEPARATOR+"jQuery.mobile.sdocml"
  bundle.project_build_path["jQuery.ui 1.x"] = "#{File.dirname($0)}"+File::SEPARATOR+"support"+File::SEPARATOR+"jQuery.ui.sdocml"
  bundle.project_build_path["require 2.x"] = "#{File.dirname($0)}"+File::SEPARATOR+"support"+File::SEPARATOR+"require.js.sdocml"
  bundle.project_build_path["react 15.1.0"] = "#{File.dirname($0)}"+File::SEPARATOR+"support"+File::SEPARATOR+"react 0.12.sdocml"	
  bundle.project_build_path["underscore 1.x"] = "#{File.dirname($0)}"+File::SEPARATOR+"support"+File::SEPARATOR+"underscore.sdocml"
  #bundle.project_build_path["jQuery 1.6.2"] = "#{File.dirname($0)}"+File::SEPARATOR+"support"+File::SEPARATOR+"jquery.1.6.2.sdocml"

  bundle.menu t(:bundle_name) do |main_menu|
    main_menu.command t(:select_dom_element)
    main_menu.command '$(this)'
    main_menu.command t(:document_ready)
    main_menu.command t(:document_ready_safe)
    main_menu.menu t(:dom_traversing) do |submenu|
      submenu.command 'add'
      #submenu.command 'children'
      submenu.command 'filter'
      submenu.command 'contains'
      submenu.command 'closest'
      #submenu.command 'filter (function)'
      submenu.command 'find'
      submenu.command 'map (function)'
      #submenu.command 'next'
      submenu.command 'not'
      #submenu.command 'parent'
      #submenu.command 'parents'
      #submenu.command 'prev'
      #submenu.command 'siblings'
      #submenu.command 'slice'
      submenu.command 'eq'
      submenu.command 'first'
      submenu.command 'last'
      #submenu.command 'nextAll'
      #submenu.command 'nextUntil'
      #submenu.command 'prevAll'
      #submenu.command 'prevUntil'
      #submenu.command 'parentsUntil'
      #submenu.command 'has'
      #submenu.command 'index'
      submenu.command 'contents'
      submenu.separator
      submenu.command 'end'
      submenu.command 'andSelf'
      submenu.separator
      submenu.command 'hasClass'
      submenu.command 'is'
    end
    main_menu.menu t(:iteration) do |submenu|
      submenu.command 'each'
      submenu.command 'toArray'
      submenu.command 'get'
      submenu.command 'size'
    end
    main_menu.menu t(:events) do |submenu|
      submenu.command 'bind'
      #submenu.command 'unbind'
      submenu.command 'live'
      submenu.command 'die'
      submenu.command 'trigger'
      submenu.command 'triggerHandler'
      submenu.command 'one'
      #submenu.command 'delegate'
      submenu.command 'undelegate'
      submenu.separator
      submenu.command 'blur'
      submenu.command 'change'
      submenu.command 'click'
      submenu.command 'dblclick'
      submenu.command 'error'
      submenu.command 'focus'
      submenu.command 'focusin'
      submenu.command 'focusout'
      submenu.command 'hover'
      submenu.command 'keydown'
      submenu.command 'keypress'
      submenu.command 'keyup'
      submenu.command 'load'
      submenu.command 'mousemove'
      submenu.command 'mouseover'
      submenu.command 'mouseout'
      submenu.command 'mouseenter'
      submenu.command 'mouseleave'
      submenu.command 'mousedown'
      submenu.command 'mouseup'
      submenu.command 'reset'
      submenu.command 'resize'
      submenu.command 'scroll'
      submenu.command 'select'
      submenu.command 'submit'
      submenu.command 'toggle (event)'
    end
    main_menu.menu t(:dom_modification) do |submenu|
      submenu.command 'after'
      submenu.command 'append'
      submenu.command 'appendTo'
      submenu.command 'before'
      submenu.command 'clone'
      #submenu.command 'html'
      submenu.command 'insertAfter'
      submenu.command 'insertBefore'
      submenu.command 'prepend'
      submenu.command 'prependTo'
      submenu.command 'remove'
      submenu.command 'text'
      submenu.command 'wrap'
      submenu.command 'wrapAll'
      submenu.command 'wrapInner'
      submenu.command 'unwrap'
      submenu.command 'replaceAll'
      submenu.command 'replaceWith'
      submenu.command 'replaceWith (function)'
    end
    main_menu.menu t(:style) do |submenu|
      submenu.command 'addClass'
      submenu.command 'removeClass'
      submenu.command 'toggleClass'
      #submenu.command 'css'
      submenu.separator
      submenu.command 'width'
      submenu.command 'height'
      submenu.command 'innerHeight'
      submenu.command 'innerWidth'
      submenu.command 'outerHeight'
      submenu.command 'outerWidth'
      #submenu.command 'offset'
      #submenu.command 'offset (function)'
      submenu.command 'offsetParent'
      submenu.command 'scrollLeft'
      submenu.command 'scrollTop'
    end
    main_menu.menu t(:effects) do |submenu|
      submenu.command 'animate'
      submenu.command 'animate (with callback)'
      #submenu.separator
      #submenu.command 'fadeIn'
      #submenu.command 'fadeOut'
      #submenu.command 'fadeTo'
      #submenu.command 'hide'
      #submenu.command 'show'
      #submenu.command 'slideDown'
      #submenu.command 'slideUp'
      #submenu.command 'slideToggle'
      #submenu.command 'toggle (show/hide)'
      #submenu.separator
      #submenu.command 'stop'
      #submenu.command 'delay'
      #submenu.command 'clearqueue'
      #submenu.command 'dequeue'
    end
    main_menu.menu ':attributes' do |submenu|
      #submenu.command 'attr'
      submenu.command 'removeAttr'
      #submenu.command 'data'
      submenu.command 'removeData'
      #submenu.command 'val'
    end
    main_menu.menu ':ajax' do |submenu|
      #submenu.command '$.ajaxSetup'
      submenu.command 'ajaxComplete'
      submenu.command 'ajaxError'
      submenu.command 'ajaxSend'
      submenu.command 'ajaxSuccess'
      #submenu.command '$.getJSON'
      #submenu.command '$.parseJSON'
      #submenu.command '$.getScript'
      #submenu.command '$.ajax'
      #submenu.command '$.post'
      #submenu.command '$.get'
      submenu.command 'ajaxStart'
      submenu.command 'ajaxStop'
      #submenu.command 'load (AHAH)'
      submenu.command 'serialize'
      submenu.command 'serializeArray'
    end
    main_menu.menu t(:selectors) do |submenu|
      submenu.command ':button'
      submenu.command ':checkbox'
      submenu.command ':checked'
      submenu.command ':contains(\'test\')'
      submenu.command ':disabled'
      submenu.command ':enabled'
      submenu.command ':empty'
      submenu.command ':eq(n)'
      submenu.command ':even'
      submenu.command ':file'
      submenu.command ':first'
      submenu.command ':first-child'
      submenu.command ':gt(n)'
      submenu.command ':hidden'
      submenu.command ':image'
      submenu.command ':input'
      submenu.command ':last'
      submenu.command ':last-child'
      submenu.command ':lt(n)'
      submenu.command ':not(s)'
      submenu.command ':nth-child(n)'
      submenu.command ':odd'
      submenu.command ':only-child'
      submenu.command ':parent'
      submenu.command ':password'
      submenu.command ':radio'
      submenu.command ':reset'
      submenu.command ':root'
      submenu.command ':selected'
      submenu.command ':submit'
      submenu.command ':text'
      submenu.command ':visible'
    end
    main_menu.menu t(:utilities) do |submenu|
      submenu.command '$.inArray'
      submenu.command '$.each'
      submenu.command '$.extend'
      submenu.command '$.merge'
      submenu.command '$.unique'
      submenu.command '$.map'
      submenu.command '$.trim'
      #submenu.command '$.browser'
      submenu.command '$.browser.version'
      submenu.command '$.boxModel'
      submenu.command '$.isPlainObject'
      submenu.command '$.isEmptyObject'
      #submenu.command '$.noop'
    end
    main_menu.menu t(:plugins) do |submenu|
      submenu.command t(:plugin_method)
      submenu.command t(:plugin_selector)
      submenu.command t(:plugin_animation)
    end
    main_menu.command t(:docs_for_selection)
  end
end
