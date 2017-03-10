require 'ruble'
=begin 
本文档是HBuilder预置的HTML代码块的文件。注意不要把其他语言的设置放到html里来。
如果用户修改此文档，HBuilder升级后会覆盖用户的修改，建议进入菜单 工具→扩展代码块 扩展相应的代码块。
若修改本文档，需要重启才能生效。修改过程中注意备份。

脚本开源地址 https://github.com/dcloudio/HBuilderRubyBundle

编辑代码块
如果要新增一个代码块，复制如下一段代码到空白行，然后设定参数。
	
snippet "userselect:none" do |s|              #'userselect:none'是代码块的显示名字；
    s.trigger = "usn"                         #'usn' 是设定激活字符，比如输入usn会在代码提示时显示该代码块；
    s.expansion = '-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;'                       #expansion是设定该代码块的输出字符，其中$0、$1是光标的停留和切换位置。
                                              #如果输出涉及到换行和tab，也需严格在这里使用换行和tab。
                                              #输出双引号在前面加\来转义，输出$使用\$(单引号中)或\\$(双引号中)转义
                                              #输入代码块后立即在$1位置激活代码提示助手
end

=end

with_defaults :scope => "source.css support.type.property-name.css" do
  
#  snippet "!important CSS" do |s|
#    s.trigger = "!"
#    s.expansion = "${1:!important}"
#  end
  
  snippet "-webkit-" do |s|
    s.trigger = "webkit"
    s.needApplyReContentAssist = true
    s.expansion = '-webkit-'
  end


  snippet "-moz-" do |s|
    s.trigger = "moz"
    s.needApplyReContentAssist = true
    s.expansion = '-moz-'
  end
  
  snippet "-ms-" do |s|
    s.trigger = "ms"
    s.needApplyReContentAssist = true
    s.expansion = '-ms-'
  end
  
  snippet "background: image repeat attachment position" do |s|
    s.trigger = "bg"
    s.needApplyReContentAssist = true
    s.expansion = "background: url($1) ${2:repeat/repeat-x/repeat-y/no-repeat} ${3:scroll/fixed} ${4:top left/top center/top right/center left/center center/center right/bottom left/bottom center/bottom right/x-% y-%/x-pos y-pos};$0"
  end
    
  snippet "background-color" do |s|
    s.trigger = "bc"
    s.expansion = "background-color: $1"
    s.needApplyReContentAssist = true
  end
    
  snippet "background-color: \#" do |s|
    s.trigger = "bch"
    s.expansion = "background-color: \#$1"
    s.needApplyReContentAssist = true
  end
  
  snippet "background-color: rgb" do |s|
    s.trigger = "bcr"
    s.expansion = "background-color: rgb(${1:255},${2:255},${3:255})"
  end
  
  snippet "background-image" do |s|
    s.trigger = "bi"
    s.expansion = "background-image: $1"
    s.needApplyReContentAssist = true
  end
  
  snippet "background-image: url" do |s|
    s.trigger = "biu"
    s.expansion = "background-image: url($1)"
    s.needApplyReContentAssist = true
  end

  snippet "background-position" do |s|
    s.trigger = "bp"
    s.expansion = "background-position: $1"
    s.needApplyReContentAssist = true
  end

  snippet "border-color" do |s|
    s.trigger = "boc"
    s.expansion = 'border-color: $1'
    s.needApplyReContentAssist = true
  end
  
  snippet "border-style" do |s|
    s.trigger = "bs"
    s.expansion = 'border-style: $1'
    s.needApplyReContentAssist = true
  end
  
  snippet "border-width" do |s|
    s.trigger = "bw"
    s.expansion = 'border-width: $1'
    s.needApplyReContentAssist = true
  end
  
  snippet "display: none" do |s|
    s.trigger = "dn"
    s.expansion = 'display: none;'
  end
  
  snippet "display: block" do |s|
    s.trigger = "db"
    s.expansion = 'display: block'
  end
  
  snippet "font-family: family" do |s|
    s.trigger = "ff"
    s.expansion = 'font-family: $1'
    s.needApplyReContentAssist = true
  end
  
  snippet "font-size: size" do |s|
    s.trigger = "fsize"
    s.expansion = 'font-size: $1'
    s.needApplyReContentAssist = true
  end

  snippet "height length" do |s|
    s.trigger = "height"
    s.expansion = 'height: ${1}px;$0'
  end
  
  snippet "list-style-image: url" do |s|
    s.trigger = "lsi"
    s.expansion = 'list-style-image: url($1);'
    s.needApplyReContentAssist = true
  end
  
  snippet "scrollbar" do |s|
    s.trigger = "scrollbarr"
    s.expansion = 'scrollbar-base-color:       ${1:#CCCCCC};
scrollbar-arrow-color:      ${2:#000000};
scrollbar-track-color:      ${3:#999999};
scrollbar-3dlight-color:    ${4:#EEEEEE};
scrollbar-highlight-color:  ${5:#FFFFFF};
scrollbar-face-color:       ${6:#CCCCCC};
scrollbar-shadow-color:     ${7:#999999};
scrollbar-darkshadow-color: ${8:#666666};'
  end
  
  snippet "text-align: left" do |s|
    s.trigger = "tal"
    s.expansion = 'text-align: left;'
  end

  snippet "text-align: center" do |s|
    s.trigger = "tac"
    s.expansion = 'text-align: center;'
  end

  snippet "text-align: right" do |s|
    s.trigger = "tar"
    s.expansion = 'text-align: right;'
  end
  
  snippet "text-transform" do |s|
    s.trigger = "tt"
    s.expansion = 'text-transform: $1'
    s.needApplyReContentAssist = true
  end
  
  snippet "width length" do |s|
    s.trigger = "widthlength"
    s.expansion = 'width: ${1}px;$0'
  end
  
  snippet "width_length" do |s|
    s.trigger = "wlength"
    s.expansion = 'width: ${1}px;$0'
  end
  
  snippet "userselect:none" do |s|
    s.trigger = "usn"
    s.expansion = '-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;'
  end
end

with_defaults :scope => "source.css entity.name.tag.css" do
  snippet "@font-face" do |s|
    s.trigger = "@fontface"
    s.locationType="CSS_OUTRULE"
    s.expansion = '@font-face {
	font-family:$1;
	src: url($2);
}'
  end
  
  snippet "@import" do |s|
    s.trigger = "@import"
    s.locationType="CSS_OUTRULE"
    s.expansion = '@import url("${1:global.css}");'
  end
  
  snippet "@charset" do |s|
    s.trigger = "@charset"
    s.locationType="CSS_OUTRULE"
    s.expansion = '@charset "${1:utf-8}";'
  end
  
  snippet "@page" do |s|
    s.trigger = "@page"
    s.locationType="CSS_OUTRULE"
    s.expansion = '@page:${1:first/left/right}{
	
}'
  end
  snippet "@keyframes" do |s|
    s.trigger = "@keyframes"
    s.locationType="CSS_OUTRULE"
    s.expansion = '@keyframes ${1:name}{
	from{$2}
	to{$3}
}'
  end
  
  snippet "@-moz-keyframes" do |s|
    s.trigger = "@keyframes"
    s.locationType="CSS_OUTRULE"
    s.expansion = '@-moz-keyframes ${1:name}{
	from{$2}
	to{$3}
}'
  end
  
  snippet "@-ms-keyframes" do |s|
    s.trigger = "@keyframes"
    s.locationType="CSS_OUTRULE"
    s.expansion = '@-ms-keyframes ${1:name}{
	from{$2}
	to{$3}
}'
  end
  
  snippet "@-webkit-keyframes" do |s|
    s.trigger = "@keyframes"
    s.locationType="CSS_OUTRULE"
    s.expansion = '@-webkit-keyframes ${1:name}{
	from{$2}
	to{$3}
}'
  end
  
  snippet "@document" do |s|
    s.trigger = "@document"
    s.locationType="CSS_OUTRULE"
    s.expansion = '@document ${1:url/url-prefix/domain/regexp}("$2") {
	$3
}'
  end
  
  snippet "@supports" do |s|
    s.trigger = "@supports"
    s.locationType="CSS_OUTRULE"
    s.expansion = '@supports(${1:prop}:${2:value}) {
	$3
}'
  end
  
  snippet "@namespace" do |s|
    s.trigger = "@namespace"
    s.locationType="CSS_OUTRULE"
    s.expansion = '@namespace ${1:prefix} "$2";'
  end
  
    
  snippet "@media" do |s|
    s.trigger = "@media"
    s.locationType="CSS_OUTRULE"
	s.expansion = '@media only screen and (min-width: $1px) {
	$2
}'
  end
end
