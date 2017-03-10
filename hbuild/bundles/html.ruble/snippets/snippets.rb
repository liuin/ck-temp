=begin 
本文档是HBuilder预置的HTML代码块的文件。注意不要把其他语言的设置放到html里来。
如果用户修改此文档，HBuilder升级后会覆盖用户的修改，建议进入菜单 工具→扩展代码块 扩展相应的代码块。
若修改本文档，需要重启才能生效。修改过程中注意备份。

脚本开源地址 https://github.com/dcloudio/HBuilderRubyBundle
=end

require 'ruble'

with_defaults :scope => 'text.html text' do |bundle|  #=====HTML标签代码块================================================================================

snippet t(:html_5) do |s|
  s.trigger = 'dochtml5'
  s.expansion = '<!DOCTYPE HTML>'
end

snippet t(:html_4_strict) do |s|
  s.trigger = 'docthtmls'
  s.expansion = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
	"http://www.w3.org/TR/html4/strict.dtd">
'
end

snippet t(:xhtml_1_frameset) do |s|
  s.trigger = 'doctxhtmlf'
  s.expansion = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
'
end

snippet t(:xhtml_1_strict) do |s|
  s.trigger = 'doctxhtmls'
  s.expansion = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
'
end

snippet t(:xhtml_1_transitional) do |s|
  s.trigger = 'doctxhmlt'
  s.expansion = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
'
end

snippet t(:xhtml_11) do |s|
  s.trigger = 'doctxhtml'
  s.expansion = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
	"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
'
end

snippet t(:html_4_transitional) do |s|
  s.trigger = 'docthtmlt'
  s.expansion = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
	"http://www.w3.org/TR/html4/loose.dtd">
'
end

snippet 'html' do |s|
  s.trigger = 'html'
  s.expansion = '<html>
	<head>
		<title>$0</title>
	</head>
	<body>
		
	</body>
</html>'
end

snippet 'head' do |cmd|
    cmd.trigger = 'head'
    cmd.expansion = "<head>
	<meta charset=\"utf-8\"/>
	<title>$1</title>
	
</head>"
end

snippet 'script' do |s|
  s.trigger = 'script'
  s.expansion = '<script type="text/javascript">
	$0
</script>'
end

snippet 'script html5plus' do |s|
  s.trigger = 'scriptplus'
  s.expansion = '<script src="html5plus://ready"></script>'
  s.description = 'html5plus提前注入时需要加上此script块'
end

snippet 'script src' do |s|
  s.trigger = 'scsrc'
  s.expansion = '<script src="$1" type="text/javascript" charset="${3:utf-8}"></script>'
  s.needApplyReContentAssist = true #这句话的意思是输出后同时激活代码助手，即在$1的位置直接拉出js列表
end

snippet 'script_jquery_google' do |s|
  s.trigger = 'scriptjg'
  s.expansion = '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>'
end

snippet 'script_jquery_baidu' do |s|
  s.trigger = 'scriptjb'
  s.expansion = '<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>'
end

snippet 'style' do |s|
  s.trigger = 'style'
  s.expansion = '<style type="text/css">
	$0
</style>'
end
snippet 'link' do |s|
  s.trigger = 'link'
  s.expansion = '<link rel="stylesheet" type="text/css" href="$1"/>'
  s.needApplyReContentAssist = true
end

snippet 'meta' do |s|
  s.trigger = 'meta'
  s.needApplyReContentAssist = true
  s.expansion = '<meta name="$1" content="$2"/>'
end

snippet 'meta_UTF8' do |s|
  s.trigger = 'metautf'
  s.expansion = '<meta charset="UTF-8"/>'
end

snippet 'meta_GB2312' do |s|
  s.trigger = 'metagb'
  s.expansion = '<meta charset="GB2312"/>'
end

snippet 'meta_nocache' do |s|
  s.trigger = 'metanocache'
  s.expansion = '<meta http-equiv="Pragma" content="no-cache" />'
end

snippet 'meta_keywords' do |s|
  s.trigger = 'metakeywords'
  s.expansion = '<meta name="Keywords" content="$1"/>'
end

snippet 'meta_description' do |s|
  s.trigger = 'metadescription'
  s.expansion = '<meta name="Description" content="$1"/>'
end

snippet 'meta_viewport' do |s|
  s.trigger = 'metaviewport'
  s.expansion = '<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />'
end

snippet 'body' do |cmd|
    cmd.trigger = 'body'
    cmd.expansion = "<body>
	$0
</body>"
end

snippet 'a_href' do |cmd|
  cmd.trigger = 'ahref'
  cmd.needApplyReContentAssist = true
  cmd.expansion = "<a href=\"$1\">$0</a>"  
end

snippet 'a_mailto' do |cmd|
  cmd.trigger = 'amail'
  cmd.expansion = "<a href=\"mailto:$1\">$0</a>"  
end

snippet 'canvas' do |s|
  s.trigger = 'canvas'
  s.expansion = '<canvas id="$1" width="$2" height="$3"></canvas>'
end

snippet 'div' do |cmd|
    cmd.trigger = 'div'
    cmd.needApplyReContentAssist = true
    cmd.expansion = "<div id=\"$1\">
	$0
</div>"        
end

snippet 'span_id' do |cmd|
    cmd.trigger = 'span'
    cmd.needApplyReContentAssist = true
    cmd.expansion = "<span id=\"$1\">
	$0
</span>"        
end

snippet 'fieldset' do |cmd|
  cmd.trigger = 'fieldset'
  cmd.expansion = "<fieldset id=\"$2\">
	<legend>$1</legend>
	
	$0
</fieldset>"
end

snippet 'h1' do |s|
  s.trigger = 'h1'
  s.expansion = '<h1>$0</h1>'
end

snippet 'h2' do |s|
  s.trigger = 'h2'
  s.expansion = '<h2>$0</h2>'
end

snippet 'h3' do |s|
  s.trigger = 'h3'
  s.expansion = '<h3>$0</h3>'
end

snippet 'h4' do |s|
  s.trigger = 'h4'
  s.expansion = '<h4>$0</h4>'
end

snippet 'h5' do |s|
  s.trigger = 'h5'
  s.expansion = '<h5>$0</h5>'
end

snippet 'h6' do |s|
  s.trigger = 'h6'
  s.expansion = '<h6>$0</h6>'
end

snippet 'img_src' do |s|
  s.trigger = 'img'
  s.expansion = '<img src="$1"/>'
  s.needApplyReContentAssist = true
end

snippet 'iframe' do |s|
  s.trigger = 'iframe'
  s.expansion = '<iframe src="$1" width="$2" height="$3"></iframe>'
  s.needApplyReContentAssist = true
end

snippet 'dl_dt_dd' do |s|
  s.trigger = 'dl'
  s.expansion = '<dl>
	<dt>$1</dt>
	<dd>$2</dd>
</dl>'
end

snippet 'ul_li' do |s|
  s.trigger = 'ul'
  s.expansion = '<ul>
	<li>$1</li>
</ul>'
end

snippet 'form_submit' do |s|
  s.trigger = 'form'
  s.expansion = "<form action=\"$1\" method=\"${2:post/get}\">
	$0
	<input type=\"submit\" value=\"$3\"/>
</form>"
  s.needApplyReContentAssist = true
end

snippet 'input' do |s|
  s.trigger = 'input'
  s.expansion = '<input type="$1" name="$2" id="$2" value="$3" />'
  s.needApplyReContentAssist = true
end

snippet 'input_text' do |s|
  s.trigger = 'intext'
  s.expansion = '<input type="text" id="$1" value="$2" />'
  s.needApplyReContentAssist = true
end

snippet 'input_button' do |s|
  s.trigger = 'inbutton'
  s.expansion = '<input type="button" id="$1" value="$2" />'
  s.needApplyReContentAssist = true
end

snippet 'input_image' do |s|
  s.trigger = 'inimage'
  s.expansion = '<input type="image" src="$1" />'
  s.needApplyReContentAssist = true
end

snippet 'input_password' do |s|
  s.trigger = 'inpassword'
  s.expansion = '<input type="password" name="$1" />'
end

snippet 'input_search' do |s|
  s.trigger = 'insearch'
  s.expansion = '<input type="search" name="$1" required="$2" placeholder="Search" x-webkit-speech="$3" x-webkit-grammar="builtin:search" lang="zh-CN">'
end

snippet 'input_submit' do |s|
  s.trigger = 'insubmit'
  s.expansion = '<input type="submit" id="$1" name="$2" />'
end

snippet 'input_reset' do |s|
  s.trigger = 'inreset'
  s.expansion = '<input type="reset" value="$1" />'
end

snippet 'input_lable' do |s|
  s.trigger = 'inputlable'
  s.expansion = '<input type="${1:radio/checkbox}" name="$2" id="$2" value="$3"/><label for="$2">$4</label>'
end

snippet 'textarea' do |s|
  s.trigger = 'textarea'
  s.expansion = '<textarea name="$1" rows="$2" cols="$3">$0</textarea>'
end

snippet 'select_option' do |s|
  s.trigger = 'select'
  s.expansion = '<select name="$1">
	<option value="$2">$3</option>
</select>'
end

snippet 'video' do |s|
  s.trigger = 'video'
  s.expansion = '<video width="${1:800}" height="$2">
	<source src="${3:myvideo.mp4}" type="video/mp4"></source>
	<source src="${4:myvideo.ogv}" type="video/ogg"></source>
	<source src="${5:myvideo.webm}" type="video/webm"></source>
	<object width="$6" height="$7" type="application/x-shockwave-flash" data="${8:myvideo.swf}">
		<param name="movie" value="$8" />
		<param name="flashvars" value="autostart=true&amp;file=$8" />
	</object>
	当前浏览器不支持 video直接播放，点击这里下载视频： <a href="${9:myvideo.webm}">下载视频</a>
</video>'
end


snippet 'table' do |s|
  s.trigger = 'table'
  s.expansion = '<table border="$1" cellspacing="$2" cellpadding="$3">
	<tr><th>${4:Header}</th></tr>
	<tr><td>${5:Data}</td></tr>
</table>'
end


snippet '<!--[if IE]>' do |s|
  s.trigger = 'ifie'
  s.expansion = '<!--[if IE]>
	$1
<![endif]-->'
end

snippet '<!--[if lte IE 6]>' do |s|
  s.trigger = 'ifie6'
  s.expansion = '<!--[if lte IE 6]>
	$1
<![endif]-->'
end

snippet t(:nbsp) do |s|
  #s.key_binding = 'OPTION+Space'
  s.expansion = '&nbsp;'
end

snippet 'Br' do |s|
  #s.key_binding = 'CONTROL+ENTER'
  s.expansion = '<br/>'
end


snippet 'ng-pluralize' do |cmd|
  cmd.trigger = 'ngp'
  cmd.expansion = "<ng-pluralize>$1</ng-pluralize>"
end
  
end

with_defaults :scope => 'text.html entity.other.attribute-name.html' do |bundle|  #=====HTML属性代码块====================================================
#如下是一个示例代码块，可以复制后再添加新代码块
  snippet 'ng-' do |s|   #ng-是显示名称，代码助手提示列表显示时可见
    s.trigger = 'ng-'        #ng-是激活字符，即按下ng-后会触发该代码块
    s.expansion='ng-${1:app/bind/bind-html/bind-template/blur/change/checked/class/class-even/class-odd/click/cloak/controller/copy/csp/cut/dblclick/disabled/focus/hide/href/if/include/init/keydown/keypress/keyup/list/model/mousedown/mouseenter/mouseleave/mousemove/mouseover/mouseup/ng-non-bindable/open/options/paste/readonly/repeat-start/repeat-end/selected/show/src/srcset/style/submit/swipe-left/swipe-right/switch/switch-default/switch-when/view}="$2"'
        #expansion是代码块的输出内容，其中$0、$1是光标的停留和切换位置。
      #$1是第一个停留光标，$0是最后回车时停留的光标。
      #使用{}包围的内容，是提示值域。
      #如果输出涉及到换行和tab，也需严格在这里使用换行和tab。
      #输出双引号在前面加\来转义，输出$使用\$(单引号中)或\\$(双引号中)转义
    s.locationType='HTML_ATTRIBUTE'
  end #ng代码块结束

end # End Snippets with scope 'text.html text'


with_defaults :scope => 'text.html entity.other.attribute-name.html' do |bundle|  #=====HTML属性代码块====================================================

  snippet 'data-' do |s|
    s.trigger = 'data-'
    s.expansion='data-${1:type/role/transition/icon/iconpos/*} = "$2"'
    s.locationType='HTML_ATTRIBUTE'
  end

end

# -----------------------------------------------------------------------------------
# Snippets that used env vars and needed to be converted to commands
with_defaults :scope => 'text.html - source', :input => :none, :output => :insert_as_snippet do |bundle|  #=====无显示名称的快捷命令=======================

  command t(:quick_br) do |cmd|
    #cmd.key_binding = 'M2+ENTER'
    cmd.output = :insert_as_snippet
    cmd.input = :none
    cmd.invoke { "<br />" }
  end
  
  command t(:quick_html_space) do |cmd|
    #cmd.key_binding = 'M2+SPACE'
    cmd.output = :insert_as_snippet
    cmd.input = :none
    cmd.invoke { "&nbsp;" }
  end

  command t(:emphasize) do |cmd|
    #cmd.key_binding = 'M1+M2+I'
    cmd.input = :selection
    cmd.invoke do |context|
      selection = ENV['TM_SELECTED_TEXT'] || ''
      if selection.length > 0
        "<em>${1:#{selection}}</em>"
      else
        "<em>$0</em>"
      end
    end
  end
  
  command t(:strong) do |cmd|
    #cmd.key_binding = 'M1+M2+B'
    cmd.input = :selection
    cmd.invoke do |context|
      selection = ENV['TM_SELECTED_TEXT'] || ''
      if selection.length > 0
        "<strong>${1:#{selection}}</strong>"
      else
        "<strong>$0</strong>"
      end
    end
  end
  
  command t(:wrap_selection_in_tag_pair) do |cmd|
    #cmd.key_binding = "CONTROL+9"
    cmd.input = :selection
    cmd.invoke do |context|
      selection = ENV['TM_SELECTED_TEXT'] || ''
      if selection.length > 0
        "<${1:p}>#{selection.gsub('/', '\/')}</${1:p}>"
      else
        "<${1:p}>$0</${1:p}>"
      end
    end
  end
end #end of 'text.html - source'

with_defaults :scope => 'text.html text', :input => :none, :output => :insert_as_snippet do |bundle|
  command t(:ie_6_and_below) do |cmd|
    cmd.trigger = '!'
    cmd.invoke do |context|
      value = (ENV['TM_SELECTED_TEXT'] || '').length > 0 ? ENV['TM_SELECTED_TEXT'] : ' IE Conditional Comment: Internet Explorer 6 and below '
      "<!--[if lte IE 6]>${1:#{value}}<![endif]-->$0"
    end
  end
  
  command t(:ie_6) do |cmd|
    cmd.trigger = '!'
    cmd.invoke do |context|
      value = (ENV['TM_SELECTED_TEXT'] || '').length > 0 ? ENV['TM_SELECTED_TEXT'] : '     IE Conditional Comment: Internet Explorer 6 only   '
      "<!--[if IE 6]>${1:#{value}}<![endif]-->$0"
    end
  end
  
  command t(:ie_7_and_above) do |cmd|
    cmd.trigger = '!'
    cmd.invoke do |context|
      value = (ENV['TM_SELECTED_TEXT'] || '').length > 0 ? ENV['TM_SELECTED_TEXT'] : ' IE Conditional Comment: Internet Explorer 7 and above '
      "<!--[if gte IE 7]>${1:#{value}}<![endif]-->$0"
    end
  end
  
  command t(:ie_8_and_above) do |cmd|
    cmd.trigger = '!'
    cmd.invoke do |context|
      value = (ENV['TM_SELECTED_TEXT'] || '').length > 0 ? ENV['TM_SELECTED_TEXT'] : ' IE Conditional Comment: Internet Explorer 8 and above '
      "<!--[if gte IE 8]>${1:#{value}}<![endif]-->$0"
    end
  end
  
  command t(:ie_9_and_above) do |cmd|
    cmd.trigger = '!'
    cmd.invoke do |context|
      value = (ENV['TM_SELECTED_TEXT'] || '').length > 0 ? ENV['TM_SELECTED_TEXT'] : ' IE Conditional Comment: Internet Explorer 9 and above '
      "<!--[if gte IE 9]>${1:#{value}}<![endif]-->$0"
    end
  end
  
  command t(:ie) do |cmd|
    cmd.trigger = '!'
    cmd.invoke do |context|
      value = (ENV['TM_SELECTED_TEXT'] || '').length > 0 ? ENV['TM_SELECTED_TEXT'] : '       IE Conditional Comment: Internet Explorer          '
      "<!--[if IE]>${1:#{value}}<![endif]-->$0"
    end
  end
  
  command t(:not_ie) do |cmd|
    cmd.trigger = '!'
    cmd.invoke do |context|
      value = (ENV['TM_SELECTED_TEXT'] || '').length > 0 ? ENV['TM_SELECTED_TEXT'] : '  IE Conditional Comment: NOT Internet Explorer      '
      "<!--[if !IE]><!-->${1:#{value}}<!-- <![endif]-->$0"
    end
  end
  
  command t(:wrap_in_jsp_tag) do |cmd|
    cmd.scope = 'text.html string'
    cmd.invoke {|context| "<?= #{ENV['TM_SELECTED_TEXT']} ?>" }
  end
  
end
