require 'ruble'
=begin 
 HBuilder可使用ruby脚本来扩展代码块和增强操作命令。这是极客的神奇玩具。
  本文档用于用户自定义HTML扩展命令，并非HBuilder预置命令的文档，预置的代码块不可改。查阅预置代码块，请在弹出预置代码块界面时点右下角的编辑按钮，比如div代码块。
  本文档修改完毕，保存即可生效。
  玩的愉快，别玩坏！
  
  脚本开源地址 https://github.com/dcloudio/HBuilderRubyBundle
  可以把你的配置共享到这里，也可以在这里获取其他网友的版本
  
  注：如果1.9版本之前的用户修改过HTML代码块，请点右键打开本文档所在目录，找之前的snippets.rb.bak文件，把修改过的内容放置进来。 
=end

with_defaults :scope => 'text.html text' do |bundle|  #=====HTML标签代码块================================================================================
#如下是一个示例代码块，可以复制后再添加新代码块
  snippet 'div_class' do |cmd|  #div_class是显示名称，代码助手提示列表显示时可见
    cmd.trigger = 'divc'        #divc是激活字符，即按下divc后会触发该代码块
    cmd.expansion = "<div class=\"$1\">
	$0
</div>"                         #expansion是代码块的输出内容，其中$0、$1是光标的停留和切换位置。$1是第一个停留光标，$0是最后回车时停留的光标。
													      #如果输出涉及到换行和tab，也需严格在这里使用换行和tab。
													      #输出双引号在前面加\来转义，输出$使用\$(单引号中)或\\$(双引号中)转义
    cmd.needApplyReContentAssist = true  #这句话的意思是输出后同时激活代码助手，即在$1的位置直接拉出样式列表
  end #div_class代码块结束
  
  snippet 'ng-pluralize' do |cmd|
    cmd.trigger = 'ngp'
    cmd.expansion = "<ng-pluralize>$1</ng-pluralize>"
  end

end


with_defaults :scope => 'text.html entity.other.attribute-name.html' do |bundle|  #=====HTML属性代码块====================================================
#如下是一个示例代码块，可以复制后再添加新代码块
  snippet 'ng-' do |s|   #ng-是显示名称，代码助手提示列表显示时可见
    s.trigger = 'ng-'		 #ng-是激活字符，即按下ng-后会触发该代码块
    s.expansion='ng-${1:app/bind/bind-html/bind-template/blur/change/checked/class/class-even/class-odd/click/cloak/controller/copy/csp/cut/dblclick/disabled/focus/hide/href/if/include/init/keydown/keypress/keyup/list/model/mousedown/mouseenter/mouseleave/mousemove/mouseover/mouseup/ng-non-bindable/open/options/paste/readonly/repeat-start/repeat-end/selected/show/src/srcset/style/submit/swipe-left/swipe-right/switch/switch-default/switch-when/view}="$2"'
		#expansion是代码块的输出内容，其中$0、$1是光标的停留和切换位置。
	  #$1是第一个停留光标，$0是最后回车时停留的光标。
	  #使用{}包围的内容，是提示值域。
	  #如果输出涉及到换行和tab，也需严格在这里使用换行和tab。
	  #输出双引号在前面加\来转义，输出$使用\$(单引号中)或\\$(双引号中)转义
    s.locationType='HTML_ATTRIBUTE'
  end #ng代码块结束

end


with_defaults :scope => 'text.html - source', :input => :none, :output => :insert_as_snippet do |bundle|  #=====无显示名称的快捷命令=======================
=begin
如下示例均为系统已经预置的命令，无需重复制作
示例1 Ctrl+Enter输出<br />
  command t(:quick_br) do |cmd|
    cmd.key_binding = 'M2+ENTER'
    cmd.output = :insert_as_snippet
    cmd.input = :none
    cmd.invoke { "<br />" }
  end
示例2 Ctrl+9为选中文字添加包围标签
  command t(:wrap_selection_in_tag_pair) do |cmd|
    cmd.key_binding = "CONTROL+9"
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
=end
#可复制一段命令，在下面开始制作新命令
snippet 'mDoctype(mui-dom结构)' do |cmd|
    cmd.trigger = 'mdoctype'
    cmd.needApplyReContentAssist = true 
    cmd.expansion = "<!doctype html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\" />
    <title>Document</title>
    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no\" />
    <link rel=\"stylesheet\" type=\"text/css\" href=\"${1:css\\/mui.css}\"/>
</head>
<body>
    $0
    <script src=\"${2:js\\/mui.js}\" type=\"text/javascript\" charset=\"utf-8\"></script>
    <script type=\"text/javascript\">
    mui.init()$3
    </script>
</body>
</html>
"
end
snippet 'mBody(主体)' do |cmd|
    cmd.trigger = 'mbody'
    cmd.expansion = '<div class="mui-content">
    $0
</div>'
end
snippet 'mScroll(区域滚动)' do |cmd|
    cmd.trigger = 'mscroll'
    cmd.expansion = "<div class=\"mui-scroll-wrapper\">
    <div class=\"mui-scroll\">
        ${1:<!--这里放置真实显示的DOM内容-->}
    </div>
</div>
$0"
end
snippet 'mrefreshContainer(刷新容器)' do |cmd|
    cmd.trigger = 'mpullrefresh'
    cmd.expansion = "<!--下拉刷新容器-->
<div id=\"refreshContainer\" class=\"mui-content mui-scroll-wrapper\">
  <div class=\"mui-scroll\">
    <!--数据列表-->
    <ul class=\"mui-table-view mui-table-view-chevron\">
      $0
    </ul>
  </div>
</div>"
end
snippet 'mHeader(标题栏)' do |cmd|
    cmd.trigger = 'mheader'
    cmd.expansion = '<header class="mui-bar mui-bar-nav">
    <h1 class="mui-title">${1:标题}</h1>
</header>$0'
end
snippet 'mHeader(带返回箭头的标题栏)' do |cmd|
    cmd.trigger = 'mheaderwithBack'
    cmd.expansion = '<header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"><\/a>
    <h1 class="mui-title">${1:标题}</h1>
</header>$0'
end
snippet 'mCheckbox(复选框)' do |cmd|
    cmd.trigger = 'mcheckbox'
    cmd.expansion = "<div class=\"mui-input-row mui-checkbox \">
    <label>${1:Checkbox}</label>
    <input name=\"${3:Checkbox}\" type=\"checkbox\" ${2:checked}>
</div>
$0"
end 

snippet 'mCheckbox(复选框居左)' do |cmd|
    cmd.trigger = 'mcheckbox_left'
    cmd.expansion = "<div class=\"mui-input-row mui-checkbox mui-left\">
  <label>${1:checkbox}</label>
  <input name=\"${3:checkbox1}\" type=\"checkbox\" ${2:checked} >
</div>
$0"
end 
  
snippet 'mCheckbox(复选框禁用选项)' do |cmd|
    cmd.trigger = 'mcheckbox_disabled'
    cmd.expansion = "<div class=\"mui-input-row mui-checkbox mui-disabled\">
    <label>${1:disabled checkbox}</label>
    <input name=\"checkbox\" type=\"checkbox\" ${2:disabled=\"disabled\"}>
</div>
$0"
end 
snippet 'mIcon(图标)' do |cmd|
    cmd.trigger = 'micon'
    cmd.needApplyReContentAssist = true 
    cmd.expansion = "<${2:span} class=\"mui-icon mui-icon-${1:weixin}\"></${2:span}>"
end 
snippet 'mOffcanvas(侧滑导航-主界面、菜单同时移动)' do |cmd|
    cmd.trigger = 'moffcanvasall'
    cmd.expansion = "<!-- 主界面菜单同时移动 -->
    <!-- 侧滑导航根容器 -->
    <div class=\"mui-off-canvas-wrap mui-draggable\">
        <!-- 主页面容器 -->
        <div class=\"mui-inner-wrap\">
            <!-- 菜单容器 -->
            <aside class=\"mui-off-canvas-left\" id=\"offCanvasSide\">
                <div class=\"mui-scroll-wrapper\">
                    <div class=\"mui-scroll\">
                        <!-- 菜单具体展示内容 -->
                        
                    </div>
                </div>
            </aside>
            <!-- 主页面标题 -->
            <header class=\"mui-bar mui-bar-nav\">
                <a class=\"mui-icon mui-action-menu mui-icon-bars mui-pull-left\" href=\"#offCanvasSide\"></a>
                <h1 class=\"mui-title\">标题</h1>
            </header>
            <nav class=\"mui-bar mui-bar-tab\">
    		    <a class=\"mui-tab-item mui-active\">
    		        <span class=\"mui-icon mui-icon-home\"></span>
    		        <span class=\"mui-tab-label\">首页</span>
    		    </a>
    		    <a class=\"mui-tab-item\">
    		        <span class=\"mui-icon mui-icon-phone\"></span>
    		        <span class=\"mui-tab-label\">电话</span>
    		    </a>
    		    <a class=\"mui-tab-item\">
    		        <span class=\"mui-icon mui-icon-email\"></span>
    		        <span class=\"mui-tab-label\">邮件</span>
    		    </a>
    		    <a class=\"mui-tab-item\">
    		        <span class=\"mui-icon mui-icon-gear\"></span>
    		        <span class=\"mui-tab-label\">设置</span>
    		    </a>
    		</nav>
            <!-- 主页面内容容器 -->
            <div class=\"mui-content mui-scroll-wrapper\">
                <div class=\"mui-scroll\">
                    <!-- 主界面具体展示内容 -->
                    
                </div>
            </div>
       	 <div class=\"mui-off-canvas-backdrop\"></div>
        </div>
    </div>"
end 
snippet 'mOffcanvas(侧滑导航-主界面移动、菜单不动)' do |cmd|
    cmd.trigger = 'moffcanvasmain'
    cmd.expansion = "<!-- 主界面移动、菜单不动 -->
<div class=\"mui-off-canvas-wrap mui-draggable\">
  <!-- 菜单容器 -->
  <aside class=\"mui-off-canvas-left\" id=\"offCanvasSide\">
    <div class=\"mui-scroll-wrapper\">
      <div class=\"mui-scroll\">
        <!-- 菜单具体展示内容 -->
        	$1
      </div>
    </div>
  </aside>
  <!-- 主页面容器 -->
  <div class=\"mui-inner-wrap\">
    <!-- 主页面标题 -->
    <header class=\"mui-bar mui-bar-nav\">
      <a class=\"mui-icon mui-action-menu mui-icon-bars mui-pull-left\"  href=\"#offCanvasSide\" ></a>
      <h1 class=\"mui-title\">标题</h1>
    </header>
    <nav class=\"mui-bar mui-bar-tab\">
	    <a class=\"mui-tab-item mui-active\">
	        <span class=\"mui-icon mui-icon-home\"></span>
	        <span class=\"mui-tab-label\">首页</span>
	    </a>
	    <a class=\"mui-tab-item\">
	        <span class=\"mui-icon mui-icon-phone\"></span>
	        <span class=\"mui-tab-label\">电话</span>
	    </a>
	    <a class=\"mui-tab-item\">
	        <span class=\"mui-icon mui-icon-email\"></span>
	        <span class=\"mui-tab-label\">邮件</span>
	    </a>
	    <a class=\"mui-tab-item\">
	        <span class=\"mui-icon mui-icon-gear\"></span>
	        <span class=\"mui-tab-label\">设置</span>
	    </a>
	</nav>
    <div class=\"mui-content mui-scroll-wrapper\">
      <div class=\"mui-scroll\">
        <!-- 主界面具体展示内容 -->
         	$2
      </div>
    </div> 
    <div class=\"mui-off-canvas-backdrop\"></div>
  </div> 
</div>$0"
end 
snippet 'mOffcanvas(侧滑导航-主界面不动、菜单移动)' do |cmd|
    cmd.trigger = 'moffcanvasmenu'
    cmd.expansion = "<!-- 主界面不动、菜单移动 -->
<!-- 侧滑导航根容器 -->
<div class=\"mui-off-canvas-wrap mui-draggable mui-slide-in\">
  <!-- 菜单容器 -->
  <aside class=\"mui-off-canvas-left\" id=\"offCanvasSide\">
    <div class=\"mui-scroll-wrapper\">
      <div class=\"mui-scroll\">
        <!-- 菜单具体展示内容 -->
        $1
      </div>
    </div>
  </aside>
  <!-- 主页面容器 -->
  <div class=\"mui-inner-wrap\">
    <!-- 主页面标题 -->
    <header class=\"mui-bar mui-bar-nav\">
      <a class=\"mui-icon mui-action-menu mui-icon-bars mui-pull-left\" href=\"#offCanvasSide\"></a>
      <h1 class=\"mui-title\">标题</h1>
    </header>
    <nav class=\"mui-bar mui-bar-tab\">
	    <a class=\"mui-tab-item mui-active\">
	        <span class=\"mui-icon mui-icon-home\"></span>
	        <span class=\"mui-tab-label\">首页</span>
	    </a>
	    <a class=\"mui-tab-item\">
	        <span class=\"mui-icon mui-icon-phone\"></span>
	        <span class=\"mui-tab-label\">电话</span>
	    </a>
	    <a class=\"mui-tab-item\">
	        <span class=\"mui-icon mui-icon-email\"></span>
	        <span class=\"mui-tab-label\">邮件</span>
	    </a>
	    <a class=\"mui-tab-item\">
	        <span class=\"mui-icon mui-icon-gear\"></span>
	        <span class=\"mui-tab-label\">设置</span>
	    </a>
	</nav>
    <div class=\"mui-content mui-scroll-wrapper\">
      <div class=\"mui-scroll\">
        <!-- 主界面具体展示内容 -->
        $2
      </div>
    </div>  
    <div class=\"mui-off-canvas-backdrop\"></div>
  </div>
</div>"
end 
snippet 'mOffcanvas(缩放式侧滑(类手机QQ))' do |cmd|
    cmd.trigger = 'moffcanvasscalable'
    cmd.expansion = "<!-- 缩放式侧滑（类手机QQ） -->
<!-- 侧滑导航根容器 -->
<div class=\"mui-off-canvas-wrap mui-draggable mui-scalable\">
  <!-- 菜单容器 -->
  <aside class=\"mui-off-canvas-left mui-transitioning\" id=\"offCanvasSide\">
    <div class=\"mui-scroll-wrapper\">
      <div class=\"mui-scroll\">
        <!-- 菜单具体展示内容 -->
        $1
      </div>
    </div>
  </aside>
  <!-- 主页面容器 -->
  <div class=\"mui-inner-wrap mui-transitioning\">
    <!-- 主页面标题 -->
    <header class=\"mui-bar mui-bar-nav\">
      <a class=\"mui-icon mui-action-menu mui-icon-bars mui-pull-left\" href=\"#offCanvasSide\"></a>
      <h1 class=\"mui-title\">标题</h1>
    </header>
    <nav class=\"mui-bar mui-bar-tab\">
	    <a class=\"mui-tab-item mui-active\">
	        <span class=\"mui-icon mui-icon-home\"></span>
	        <span class=\"mui-tab-label\">首页</span>
	    </a>
	    <a class=\"mui-tab-item\">
	        <span class=\"mui-icon mui-icon-phone\"></span>
	        <span class=\"mui-tab-label\">电话</span>
	    </a>
	    <a class=\"mui-tab-item\">
	        <span class=\"mui-icon mui-icon-email\"></span>
	        <span class=\"mui-tab-label\">邮件</span>
	    </a>
	    <a class=\"mui-tab-item\">
	        <span class=\"mui-icon mui-icon-gear\"></span>
	        <span class=\"mui-tab-label\">设置</span>
	    </a>
	</nav>
    <div class=\"mui-content mui-scroll-wrapper\">
      <div class=\"mui-scroll\">
        <!-- 主界面具体展示内容 -->
        $2
      </div>
    </div>  
    <div class=\"mui-off-canvas-backdrop\"></div>
  </div>
</div>$0"
end 
snippet 'mText(文本框)' do |cmd|
    cmd.trigger = 'minputtext'
    cmd.needApplyReContentAssist = true 
    cmd.expansion = "<div class=\"mui-input-row\">
    <label>${3:Input}</label>
    <input type=\"${1:text}\" placeholder=\"${2:普通输入框}\">
</div>
$0"
end
  
snippet 'mText_Search(搜索框)' do |cmd|
    cmd.trigger = 'minputsearch'
    cmd.expansion = "<div class=\"mui-input-row mui-search\">
    <input type=\"search\" class=\"mui-input-clear\" placeholder=\"$1\">
</div>
$0"
end

snippet 'mText_Clear(带清除按钮的文本框)' do |cmd|
    cmd.trigger = 'minputclear'
    cmd.expansion = "<div class=\"mui-input-row\">
    <label>Input</label>
    <input type=\"text\" class=\"mui-input-clear\" placeholder=\"${1:带清除按钮的输入框}\">
</div>
$0"
end

snippet 'mText_Speech(语音输入)' do |cmd|
    cmd.trigger = 'minputspeech'
    cmd.expansion = "<div class=\"mui-input-row\">
    <label>${2:Input}</label>
    <input type=\"text\" class=\"mui-input-speech mui-input-clear\" placeholder=\"${1:语音输入}\">
</div>
$0"
end
  
snippet 'mForm(表单)' do |cmd|
    cmd.trigger = 'mform'
    cmd.needApplyReContentAssist = true 
    cmd.expansion = "<form class=\"mui-input-group\">
    <div class=\"mui-input-row\">
        <label>${3:input}</label>
        <input type=\"${1:text}\" class=\"${2:mui-input-clear}\" placeholder=\"${3:请输入}\">
    </div>
</form>$0"
end
  
snippet 'mRadio(单选框)' do |cmd|
    cmd.trigger = 'mradio'
    cmd.expansion = "<div class=\"mui-input-row mui-radio \">
    <label>${1:Radio}</label>
    <input name=\"${3:radio}\" type=\"radio\" ${2:checked}>
</div>$0"
end

snippet 'mRadio(单选框居左)' do |cmd|
    cmd.trigger = 'mradio_left'
    cmd.expansion = "<div class=\"mui-input-row mui-radio mui-left\">
    <label>${1:Radio}</label>
    <input name=\"${3:radio}\" type=\"radio\" ${2:checked}>
</div>$0"
end

snippet 'mRadio(禁用单选框)' do |cmd|
    cmd.trigger = 'mradio_disable'
    cmd.expansion = "<div class=\"mui-input-row mui-radio mui-disabled\">
    <label>${1:Radio}</label>
    <input name=\"${3:radio}\" type=\"radio\" disabled=\"disabled\">
</div>$0"
end
snippet 'mRadios(默认选中指定项)' do |cmd|
    cmd.trigger = 'mradio_selected'
    cmd.expansion = "<ul class=\"mui-table-view mui-table-view-radio\">
    <li class=\"mui-table-view-cell\">
        <a class=\"mui-navigate-right\">${1:Item 1}</a>
    </li>
    <li class=\"mui-table-view-cell mui-selected\">
        <a class=\"mui-navigate-right\">${2:Item 2}</a>
    </li>
    <li class=\"mui-table-view-cell\">
        <a class=\"mui-navigate-right\">${3:Item 3}</a>
    </li>
</ul>
$0"
end
  
snippet 'mPopover(弹出菜单)' do |cmd|
    cmd.trigger = 'mpopover'
    cmd.expansion = "${1:<style type=\"text\\/css\">
#popover{
	height: 100px;
	width:200px;
\\}
<\\/style>}
<div id=\"popover\" class=\"mui-popover\">
	<div class=\"mui-scroll-wrapper\">
	    <div class=\"mui-scroll\">
		    <ul class=\"mui-table-view\">
		    	<li class=\"mui-table-view-cell\"><a href=\"#\">Item1</a></li>
		    	<li class=\"mui-table-view-cell\"><a href=\"#\">Item2</a></li>
		    	<li class=\"mui-table-view-cell\"><a href=\"#\">Item3</a></li>
		    	<li class=\"mui-table-view-cell\"><a href=\"#\">Item4</a></li>
		    	<li class=\"mui-table-view-cell\"><a href=\"#\">Item5</a></li>
		    </ul>
		</div>
	</div>
</div>
<a href=\"#popover\" id=\"openPopover\" class=\"mui-btn mui-btn-primary mui-btn-block\">打开弹出菜单</a>
${2:mui('.mui-scroll-wrapper').scroll()}"
end
  
snippet 'mActionsheet(H5模式弹出菜单)' do |cmd|
    cmd.trigger = 'mactionsheet'
    cmd.expansion = "<div id=\"sheet\" class=\"mui-popover mui-popover-bottom mui-popover-action \">
    <!-- 可选择菜单 -->
    <ul class=\"mui-table-view\">
      <li class=\"mui-table-view-cell\">
        <a href=\"#\">${1:菜单1}</a>
      </li>
      <li class=\"mui-table-view-cell\">
        <a href=\"#\">${2:菜单2}</a>
      </li>
    </ul>
    <!-- 取消菜单 -->
    <ul class=\"mui-table-view\">
      <li class=\"mui-table-view-cell\">
        <a href=\"#sheet1\"><b>${4:取消}</b></a>
      </li>
    </ul>
</div>
<a href=\"#sheet\" id=\"openSheet\" class=\"mui-btn mui-btn-primary mui-btn-block\">${3:打开操作表}</a>
$0"
end
  
snippet 'mRange(Label+滑块)' do |cmd|
    cmd.trigger = 'mrangelabel'
    cmd.expansion = "<div class=\"mui-input-row mui-input-range\">
    <label>Range</label>
    <input type=\"range\" min=\"0\" max=\"100\" value=\"50\">
</div>"
end
   
snippet 'mSwitch(开关)' do |cmd|
    cmd.trigger = 'mswitch'
    cmd.expansion = "<div class=\"mui-input-row\">
    <label>${2:Switch}</label>
    <div class=\"mui-switch${1: mui-active}\">
        <div class=\"mui-switch-handle\"></div>
    </div>
</div>$0"
end
  
snippet 'mSwitch(开关 - 蓝色)' do |cmd|
    cmd.trigger = 'mswitchblue'
    cmd.expansion = "<div class=\"mui-input-row\">
    <label>${2:Switch}</label>
    <div class=\"mui-switch${1: mui-active} mui-switch-blue\">
        <div class=\"mui-switch-handle\"></div>
    </div>
</div>$0"
end
  
snippet 'mSwitch(开关Mini)' do |cmd|
    cmd.trigger = 'mswitchmini'
    cmd.expansion = "<div class=\"mui-switch mui-switch-mini${1: mui-active}\">
  <div class=\"mui-switch-handle\"></div>
</div>"
end
  
snippet 'mSwitch(开关Mini - blue)' do |cmd|
    cmd.trigger = 'mswitchminiblue'
    cmd.expansion = "<div class=\"mui-switch mui-switch-mini${1: mui-active} mui-switch-blue\">
  <div class=\"mui-switch-handle\"></div>
</div>"
end
  
snippet 'mbadge（数字角标）' do |cmd|
    cmd.trigger = 'mbadge'
    cmd.expansion = "<span class=\"mui-badge ${1:mui-btn-blue/mui-btn-green/mui-btn-yellow/mui-btn-red/mui-btn-purple/mui-btn-grey}\">${2:1}</span>$0"
end
snippet 'mbadge（数字角标无底色）' do |cmd|
    cmd.trigger = 'mbadgeinverted'
    cmd.expansion = "<span class=\"mui-badge mui-badge-inverted ${1:mui-btn-blue/mui-btn-green/mui-btn-yellow/mui-btn-red/mui-btn-purple/mui-btn-grey}\">${2:1}</span>$0"
end
  
snippet 'mTab(底部选项卡)' do |cmd|
    cmd.trigger = 'mtab'
    cmd.expansion = "<nav class=\"mui-bar mui-bar-tab\">
    <a class=\"mui-tab-item mui-active\">
        <span class=\"mui-icon mui-icon-home\"></span>
        <span class=\"mui-tab-label\">${1:首页}</span>
    </a>
    <a class=\"mui-tab-item\">
        <span class=\"mui-icon mui-icon-phone\"></span>
        <span class=\"mui-tab-label\">${2:电话}</span>
    </a>
    <a class=\"mui-tab-item\">
        <span class=\"mui-icon mui-icon-email\"></span>
        <span class=\"mui-tab-label\">${3:邮件}</span>
    </a>
    <a class=\"mui-tab-item\">
        <span class=\"mui-icon mui-icon-gear\"></span>
        <span class=\"mui-tab-label\">${4:设置}</span>
    </a>
</nav>$0"
end
  
snippet 'mTabSegmented(div选项卡)' do |cmd|
    cmd.trigger = 'mtabsegmented'
    cmd.expansion = "<div class=\"mui-segmented-control\">
    <a class=\"mui-control-item mui-active\" href=\"#item1\">${1:选项卡1}</a>
    <a class=\"mui-control-item\" href=\"#item2\">${1:选项卡2}</a>
</div>$0"
end
  
snippet 'mTabSegmented(可左右拖动的选项卡)' do |cmd|
    cmd.trigger = 'mtabviewpage'
    cmd.expansion = '<div class="mui-slider">
    <div class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <a class="mui-control-item" href="#item1">${1:选项卡1}</a>
        <a class="mui-control-item" href="#item2">${2:选项卡2}</a>
    </div>
    <div id="sliderProgressBar" class="mui-slider-progress-bar mui-col-xs-4"></div>
    <div class="mui-slider-group">
        <div id="item1" class="mui-slider-item mui-control-content mui-active">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell">${3:第1个选项卡子项}</li>
                <li class="mui-table-view-cell">${4:第1个选项卡子项}</li>
            </ul>
        </div>
        <div id="item2mobile" class="mui-slider-item mui-control-content">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell">${5:第2个选项卡子项}</li>
                <li class="mui-table-view-cell">${6:第2个选项卡子项}</li>
            </ul>
        </div>
    </div>
</div>$0'
end
  
snippet 'mPagination(分页)' do |cmd|
    cmd.trigger = 'mpagination'
    cmd.expansion = "<ul class=\"mui-pagination\">
    <li class=\"mui-disabled\">
        <span> &laquo; </span>
    </li>
    <li class=\"mui-active\">
        <a href=\"#\">${1:1}</a>
    </li>
    <li>
        <a href=\"#\">${2:2}</a>
    </li>
    <li>
        <a href=\"#\">&raquo;</a>
    </li>
</ul>$0"
end
  
snippet 'mList(列表)' do |cmd|
    cmd.trigger = 'mlist'
    cmd.expansion = "<ul class=\"mui-table-view\">
        <li class=\"mui-table-view-cell\">
            <a class=\"mui-navigate-right\">
                ${1:Item 1}
            </a>
        </li>
        <li class=\"mui-table-view-cell\">
            <a class=\"mui-navigate-right\">
                 ${2:Item 2}
            </a>
        </li>
        <li class=\"mui-table-view-cell\">
            <a class=\"mui-navigate-right\">
                 ${3:Item 3}
            </a>
        </li>
    </ul>$0"
end
  
snippet 'mListMedia(图文列表图片居左)' do |cmd|
    cmd.trigger = 'mlist_Media_left'
    cmd.needApplyReContentAssist = true 
    cmd.expansion = "<ul class=\"mui-table-view\">
    <li class=\"mui-table-view-cell mui-media\">
        <a href=\"javascript:;\">
            <img class=\"mui-media-object mui-pull-left\" src=\"${1:http:\\/\\/placehold.it\\/40x30}\">
            <div class=\"mui-media-body\">
                ${4:幸福}
                <p class=\"mui-ellipsis\">${5:能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？}</p>
            </div>
        </a>
    </li>
    <li class=\"mui-table-view-cell mui-media\">
        <a href=\"javascript:;\">
            <img class=\"mui-media-object mui-pull-left\" src=\"${2:http:\\/\\/placehold.it\\/40x30}\">
            <div class=\"mui-media-body\">
                ${6:木屋}
                <p class=\"mui-ellipsis\">${7:想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.}</p>
            </div>
        </a>
    </li>
    <li class=\"mui-table-view-cell mui-media\">
        <a href=\"javascript:;\">
            <img class=\"mui-media-object mui-pull-left\" src=\"${3:http:\\/\\/placehold.it\\/40x30}\">
            <div class=\"mui-media-body\">
               ${8: CBD}
                <p class=\"mui-ellipsis\">${9:烤炉模式的城，到黄昏，如同打翻的调色盘一般.}</p>
            </div>
        </a>
    </li>
</ul>$0"
end

snippet 'mListMedia(图文列表图片居右)' do |cmd|
    cmd.trigger = 'mlist_Media_right'
    cmd.needApplyReContentAssist = true 
    cmd.expansion = "<ul class=\"mui-table-view\">
    <li class=\"mui-table-view-cell mui-media\">
        <a href=\"javascript:;\">
            <img class=\"mui-media-object mui-pull-right\" src=\"${1:http:\\/\\/placehold.it\\/40x30}\">
            <div class=\"mui-media-body\">
                ${4:幸福}
                <p class=\"mui-ellipsis\">${5:能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？}</p>
            </div>
        </a>
    </li>
    <li class=\"mui-table-view-cell mui-media\">
        <a href=\"javascript:;\">
            <img class=\"mui-media-object mui-pull-right\" src=\"${2:http:\\/\\/placehold.it\\/40x30}\">
            <div class=\"mui-media-body\">
                ${6:木屋}
                <p class=\"mui-ellipsis\">${7:想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.}</p>
            </div>
        </a>
    </li>
    <li class=\"mui-table-view-cell mui-media\">
        <a href=\"javascript:;\">
            <img class=\"mui-media-object mui-pull-right\" src=\"${3:http:\\/\\/placehold.it\\/40x30}\">
            <div class=\"mui-media-body\">
               ${8: CBD}
                <p class=\"mui-ellipsis\">${9:烤炉模式的城，到黄昏，如同打翻的调色盘一般.}</p>
            </div>
        </a>
    </li>
</ul>$0"
end

snippet 'mGrid(九宫格)' do |cmd|
    cmd.trigger = 'mgrid'
    cmd.expansion = "<ul class=\"mui-table-view mui-grid-view mui-grid-9\">
<li class=\"mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3\">
    <a href=\"#\">
        <span class=\"mui-icon mui-icon-home\"></span>
        <div class=\"mui-media-body\">${1:Home}</div>
    </a>
</li>
<li class=\"mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3\">
    <a href=\"#\">
        <span class=\"mui-icon mui-icon-email\"><span class=\"mui-badge mui-badge-red\">5</span></span>
        <div class=\"mui-media-body\">${2:Email}</div>
    </a>
</li>
<li class=\"mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3\">
    <a href=\"#\">
        <span class=\"mui-icon mui-icon-chatbubble\"></span>
        <div class=\"mui-media-body\">${3:Chat}</div>
    </a>
</li>
<li class=\"mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3\">
    <a href=\"#\">
        <span class=\"mui-icon mui-icon-location\"></span>
        <div class=\"mui-media-body\">${4:Location}</div>
    </a>
</li>
<li class=\"mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3\">
    <a href=\"#\">
        <span class=\"mui-icon mui-icon-search\"></span>
        <div class=\"mui-media-body\">${5:Search}</div>
    </a>
</li>
<li class=\"mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3\">
    <a href=\"#\">
        <span class=\"mui-icon mui-icon-phone\"></span>
        <div class=\"mui-media-body\">${6:Phone}</div>
    </a>
</li>
    </ul>
$0"
end
  
snippet 'mGallery-Table(图文表格)' do |cmd|
    cmd.trigger = 'mslider_gallery_table'
    cmd.expansion = "<ul class=\"mui-table-view mui-grid-view\">
    <li class=\"mui-table-view-cell mui-media mui-col-xs-6\">
        <a href=\"#\">
            <img class=\"mui-media-object\" src=\"http://placehold.it/400x300\">
            <div class=\"mui-media-body\">${1:文字说明1}</div>
        </a>
    </li>
    <li class=\"mui-table-view-cell mui-media mui-col-xs-6\">
        <a href=\"#\">
            <img class=\"mui-media-object\" src=\"http://placehold.it/400x300\">
            <div class=\"mui-media-body\">${2:文字说明2}</div>
        </a>
    </li>
</ul>$0"
end
  
snippet 'mGallery图片轮播' do |cmd|
    cmd.trigger = 'mslider_gallery'
    cmd.expansion = "<div id=\"slider\" class=\"mui-slider\" >
  <div class=\"mui-slider-group mui-slider-loop\">
    <!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
    <div class=\"mui-slider-item mui-slider-item-duplicate\">
      <a href=\"#\">
        <img src=\"${1:http:\\/\\/placehold.it\\/400x300}\">
      </a>
    </div>
    <!-- 第一张 -->
    <div class=\"mui-slider-item\">
      <a href=\"#\">
        <img src=\"${2:http:\\/\\/placehold.it\\/400x300}\">
      </a>
    </div>
    <!-- 第二张 -->
    <div class=\"mui-slider-item\">
      <a href=\"#\">
        <img src=\"${3:http:\\/\\/placehold.it\\/400x300}\">
      </a>
    </div>
    <!-- 第三张 -->
    <div class=\"mui-slider-item\">
      <a href=\"#\">
        <img src=\"${4:http:\\/\\/placehold.it\\/400x300}\">
      </a>
    </div>
    <!-- 第四张 -->
    <div class=\"mui-slider-item\">
      <a href=\"#\">
        <img src=\"${1:http:\\/\\/placehold.it\\/400x300}\">
      </a>
    </div>
    <!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
    <div class=\"mui-slider-item mui-slider-item-duplicate\">
      <a href=\"#\">
        <img src=\"${2:http:\\/\\/placehold.it\\/400x300}\">
      </a>
    </div>
  </div>
  <div class=\"mui-slider-indicator\">
    <div class=\"mui-indicator mui-active\"></div>
    <div class=\"mui-indicator\"></div>
    <div class=\"mui-indicator\"></div>
    <div class=\"mui-indicator\"></div>
  </div>
</div>"
end
snippet 'slide（轮播组件）' do |cmd|
    cmd.trigger = 'mslider'
    cmd.expansion = "<div class=\"mui-slider\">
  <div class=\"mui-slider-group\">
    <!--第一个内容区容器-->
    <div class=\"mui-slider-item\">
      <!-- 具体内容 -->
    </div>
    <!--第二个内容区-->
    <div class=\"mui-slider-item\">
      <!-- 具体内容 -->
    </div>
  </div>
</div>"
end
  
snippet 'mactionsheet（操作表）' do |cmd|
    cmd.trigger = 'actionsheet'
    cmd.expansion = "<div id=\"sheet1\" class=\"mui-popover mui-popover-bottom mui-popover-action \">
    <!-- 可选择菜单 -->
    <ul class=\"mui-table-view\">
      <li class=\"mui-table-view-cell\">
        <a href=\"#\">${1菜单1}</a>
      </li>
      <li class=\"mui-table-view-cell\">
        <a href=\"#\">${2菜单2}</a>
      </li>
    </ul>
    <!-- 取消菜单 -->
    <ul class=\"mui-table-view\">
      <li class=\"mui-table-view-cell\">
        <a href=\"#sheet1\"><b>${3取消}</b></a>
      </li>
    </ul>
</div>$0"
end

snippet 'maccordion（折叠面板）' do |cmd|
    cmd.trigger = 'maccordion'
    cmd.expansion = '<ul class="mui-table-view">
    <li class="mui-table-view-cell mui-collapse">
        <a class="mui-navigate-right" href="#">${1:面板1}</a>
        <div class="mui-collapse-content">
            <p>${2:面板1子内容}</p>
        </div>
    </li>
    <li class="mui-table-view-cell mui-collapse">
        <a class="mui-navigate-right" href="#">${3:面板}</a>
            <div class="mui-collapse-content">
            <p>${4:面板2子内容}</p>
        </div>
    </li>
    <li class="mui-table-view-cell mui-collapse">
        <a class="mui-navigate-right" href="#">${5:面板3}</a>
        <div class="mui-collapse-content">
            <p>${6:面板3子内容}</p>
        </div>
    </li>
</ul>$0'
end

snippet 'mnumbox(数字输入框)' do |cmd|
    cmd.trigger = 'mnumbox'
    cmd.expansion = "
<div class=\"mui-numbox\" data-numbox-step=\'${1:1}\' data-numbox-min=\'${2:0}\' data-numbox-max=\'${3:10}\'>
    <button class=\"mui-btn mui-btn-numbox-minus\" type=\"button\">-</button>
    <input class=\"mui-input-numbox\" type=\"number\" />
    <button class=\"mui-btn mui-btn-numbox-plus\" type=\"button\">+</button>
</div>$0"
end
snippet 'mButton(按钮)' do |cmd|
    cmd.trigger = 'mbutton'
    cmd.expansion = "<button type=\"button\" class=\"mui-btn ${1:mui-btn-blue/mui-btn-green/mui-btn-yellow/mui-btn-red/mui-btn-purple/mui-btn-grey}\">${2:按钮}</button>$0"
end
snippet 'mButton(按钮无底色,有边框)' do |cmd|
    cmd.trigger = 'mbutton_outline'
    cmd.expansion = "<button type=\"button\" class=\"mui-btn ${1:mui-btn-blue/mui-btn-green/mui-btn-yellow/mui-btn-red/mui-btn-purple/mui-btn-grey} mui-btn-outlined\">${2:按钮}</button>$0"
end
snippet 'mButton(块状按钮)' do |cmd|
    cmd.trigger = 'mbutton_block'
    cmd.expansion = "<button type=\"button\" class=\"mui-btn ${1:mui-btn-blue/mui-btn-green/mui-btn-yellow/mui-btn-red/mui-btn-purple/mui-btn-grey} mui-btn-block\">${2:按钮}</button>$0"
end
snippet 'mprogressbar(进度条-有准确值)' do |cmd|
    cmd.trigger = 'mprogressbar'
    cmd.expansion = "<div class=\"mui-progressbar\">
	<span></span>
</div>"
end
snippet 'mprogressbar(进度条-无限循环)' do |cmd|
    cmd.trigger = 'mprogressbarinfinite'
    cmd.expansion = "<div class=\"mui-progressbar mui-progressbar-infinite\">
	<span></span>
</div>"
end
snippet 'a_href_javascript' do |cmd|
    cmd.trigger = 'ajsvoid'
    cmd.expansion = "<a href=\"javascript:void(0);\">$1</a>$0"
end
snippet 'mui-row' do |cmd|
    cmd.trigger = 'mrow'
    cmd.expansion = "<div class=\"mui-row\">
    $0
<\/div>"
  end
  snippet 'mui-col-sm' do |cmd|
    cmd.trigger = 'mcolsm'
    cmd.expansion = "<div class=\"mui-col-sm-${1:6}\">${2:Item 1}</div>
<div class=\"mui-col-sm-${3:6}\">Item 2</div>"
  end
  snippet 'mui-col-xs' do |cmd|
    cmd.trigger = 'mcolxs'
    cmd.expansion = "<div class=\"mui-col-xs-${1:6}\">${2:Item 1}</div>
<div class=\"mui-col-xs-${3:6}\">${2:Item 2}</div>"
  end


snippet 'mscrollsegmented(横向滚动)' do |cmd|
    cmd.trigger = 'mscrollsegmented'
    cmd.expansion = "<div class=\"mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted\">
    <div class=\"mui-scroll\">
        <a class=\"mui-control-item mui-active\">
            ${1:推荐}
        </a>
        <a class=\"mui-control-item\">
          ${2:热点}
        </a>
        <a class=\"mui-control-item\">
           ${3:北京}
        </a>
        <a class=\"mui-control-item\">
           ${4:社会}
        </a>
        <a class=\"mui-control-item\">
           ${5:娱乐}
        </a>
        <a class=\"mui-control-item\">
           ${6:科技}
        </a>
    </div>
</div>"
end
end


 #=====MUI JS代码块========================
with_defaults :scope => "source.js" do
  snippet "console.log();" do |s|
    s.trigger = "cl"
    s.expansion = "console.log($1);"
  end
  snippet "return true;" do |s|
  s.trigger = "rtrue"
  s.expansion = "return true;"
  end
  snippet "return false;" do |s|
  s.trigger = "rfalse"
  s.expansion = "return false;"
  end
  snippet "querySelector" do |s|
  s.trigger = "ds"
  s.needApplyReContentAssist = true
  s.expansion = "document.querySelector(\'$1\').$0"
  end 
  snippet "querySelectoraddEventListener" do |s|
  s.trigger = "dsa"
  s.needApplyReContentAssist = true
  s.expansion = "document.querySelector(\'$1\').addEventListener(\'${2:tap}\',function ($3) {
        $0
})"
  end 
  snippet "getElementByIdaddEventListener" do |s|
  s.trigger = "dga"
  s.needApplyReContentAssist = true
  s.expansion = "document.getElementById(\'$1\').addEventListener(\'${2:tap}\',function ($3) {
        $0
})"
  end 
  snippet "windowaddEventListener" do |s|
  s.trigger = "wad"
  s.needApplyReContentAssist = true
  s.expansion = "window.addEventListener(\'${1:scroll}\',function ($2) {
        $0
})"
  end 
  snippet "documentaddEventListener" do |s|
  s.trigger = "dad"
  s.needApplyReContentAssist = true
  s.expansion = "document.addEventListener(\'${1:scroll}\',function ($2) {
        $0
})"
  end 
  snippet "mui.on" do |s|
  s.trigger = "mmon"
  s.needApplyReContentAssist = true
  s.expansion = "mui('$1').on('${2:tap}','$3',function($4){
  $0
}) "
  end 
  snippet "mui.off" do |s|
  s.trigger = "mmoff"
  s.needApplyReContentAssist = true
  s.expansion = "mui('$1').off('${2:tap}','$3',function($4){
  $0
}) "
  end 
  snippet "mui.trigger()" do |s|
  s.trigger = "mtrigger"
  s.expansion = "mui.trigger(${1:dom},'${3:tap}'${4:,{a:'as'}})"
  end 
  snippet "mui.fire()" do |s|
  s.trigger = "mfire"
  s.needApplyReContentAssist = true
  s.expansion = "mui.fire(${1:targetWebviewObj},'${2:event}',{${3:data}})"
  end 
  snippet "mui()" do |s|
  s.trigger = "mmui"
  s.needApplyReContentAssist = true
  s.expansion = "mui('$1')"
  end
  snippet "mui('').slider" do |s|
  s.trigger = "mmslider"
  s.needApplyReContentAssist = true
  s.expansion = "mui('.${1:mui-slider}').slider({$2})$0"
  end
  snippet "mui('').scroll" do |s|
  s.trigger = "mmscroll"
  s.needApplyReContentAssist = true
  s.expansion = "mui('.${1:mui-scroll-wrapper}').scroll({$2})$0"
  end
  snippet "mui" do |s|
  s.trigger = "mui"
  s.needApplyReContentAssist = true
  s.expansion = "mui."
  end 
  snippet "mui.each()" do |s|
  s.trigger = "meach"
  s.expansion = "mui.each(${1:obj},function (${2:index},${3:element}) {
	$0
})"
  end 
  snippet "mui().each()" do |s|
  s.trigger = "mmeach"
  s.expansion = "mui('$1').each(function (${3:index},${4:element}) {
	$0
})"
  end 
  snippet "mui.extend()" do |s|
  s.trigger = "mextend"
  s.expansion = "mui.extend(${1:'target'},${2:'source'},${3:'deep'/true/false})"
  end 
  snippet "mui.later()" do |s|
  s.trigger = "mlater"
  s.expansion = "mui.later(function()\{
	$2  
},${1:500/1000/1500/2000})"
  end 
  snippet "mui.scrollTo()" do |s|
  s.trigger = "mscrollto"
  s.expansion = "mui.scrollTo(${1:ypos},${2:duration},${3:/function () {
    	
}}$0"
  end 
  snippet "mui.alert()" do |s|
  s.trigger = "mdalert"
  s.expansion = "mui.alert('${1:message}','${2:title}','${3:btnValue}',function \(${4:e}\) \{
   ${4:e}.index$0
\}${5:,'div'})"
  end 
  snippet "mui.confirm()" do |s|
  s.trigger = "mdconfirm"
  s.expansion = "mui.confirm('${1:message}','${2:title}',['${3:取消}','${4:确认}'],function (${5:e}) {
	${5:e}.index$0
}${6:,'div'})"
  end 
  snippet "mui.prompt()" do |s|
  s.trigger = "mdprompt"
  s.expansion = " mui.prompt('${1:text}','${2:defaultText}','${3:title}',['${4:取消}','${5:确认}'],function (${6:e}) {
    ${6:e}.index$0
}${7:,'div'})"
  end 
  snippet "mui.toast()" do |s|
  s.trigger = "mdtoast"
  s.expansion = "mui.toast('${1:message}')$0"
  end 
  snippet "mui.closePopup()" do |s|
  s.trigger = "mdclosePopup"
  s.expansion = "mui.closePopup()$0"
  end 
  snippet "mui.closePopups()" do |s|
  s.trigger = "mdclosePopups"
  s.expansion = "mui.closePopups()$0"
  end 
  snippet "mui.ajax()" do |s|
  s.trigger = "majax"
  s.needApplyReContentAssist = true
  s.expansion = "mui.ajax('$1',{
	data:{
		$2
	},
	dataType:'${3:json}',//服务器返回json格式数据
	type:'${4:post}',//HTTP请求类型
	timeout:${5:10000},//超时时间设置为10秒；
	success:function(${6:data}){
		$7
	},
	error:function(${8:xhr,type,errorThrown}){
		$9
	}
});$0"
  end 
  snippet "mui.post()" do |s|
  s.trigger = "mpost"
  s.needApplyReContentAssist = true
  s.expansion = "mui.post('$1',{
		$2
	},function(${3:data}){
		$0
	},'${4:json}'
);"
  end 
  snippet "mui.get()" do |s|
  s.trigger = "mget"
  s.needApplyReContentAssist = true
  s.expansion = "mui.gett('$1',{
		$2
	},function(${3:data}){
		$0
	},'${4:json}'
);"
  end 
  snippet "mui.getJSON()" do |s|
  s.trigger = "mjson"
  s.needApplyReContentAssist = true
  s.expansion = "mui.getJSON('$1',{$2},function($3){
		$4
	}
);$0"
  end 
#init
    snippet "mui.init" do |s|
      s.trigger = "minit"
      s.expansion = "mui.init({$0})"
      #s.needApplyReContentAssist = true
  end
  snippet "mui.init({子页面})" do |s|
  s.trigger = "minsubpage"
  s.needApplyReContentAssist = true
  s.expansion = "mui.init({
	subpages:[{
	  url:'${1:url}',
      id:'${2:id}',
      styles:{
        $3
      },
      extras:{$4}
	}]
})$0"
  end 
  snippet "mui.init({预加载})" do |s|
  s.trigger = "minpreload"
  s.needApplyReContentAssist = true
  s.expansion = "mui.init({
	preloadPages:[{
	  url:'${1:url}',
      id:'${2:id}',
      styles:{
        $3
      },
      extras:{$4}
	}]
})$0"
  end 
  snippet "mui.init({刷新组件})" do |s|
  s.trigger = "minpullRefresh"
  s.needApplyReContentAssist = true
  s.expansion = "mui.init({
  pullRefresh : {
    container:'\#${1:refreshContainer}',
    down : {
      callback :${2:pullfresh}
    },
    up : {
      callback :${3:pullfresh} 
    }
  }
});$0"
  end 
  snippet "mui.init({手势事件})" do |s|
  s.trigger = "mingesture"
  s.expansion = "mui.init({
  	gestureConfig:{
	   tap: ${1:true/false}, 
	   doubletap: ${2:true/false}, 
	   longtap: ${3:true/false}, 
	   swipe: ${4:true/false}, 
	   drag: ${5:true/false}, 
	   hold:${6:false/true},
	   release:${7:false/true}
  	}
});$0"
  end 
  snippet "mui.init({侧滑返回})" do |s|
  s.trigger = "minswipeback"
  s.expansion = "mui.init({
	swipeBack:${1:true/false} 
);$0"
  end 
  snippet "mui.init({按键绑定})" do |s|
  s.trigger = "minkeyevent"
  s.expansion = "mui.init({
	keyEventBind: {
		backbutton: ${1:true/false},  
		menubutton: ${2:true/false}   
	},
})"
  end 
  snippet "mui.init({重写窗口关闭逻辑})" do |s|
  s.trigger = "minbeforeback"
  s.expansion = "mui.init({
	beforeback:function () {
		$0
	}
})"
  end 
  snippet "mui.init({设置状态栏颜色})" do |s|
  s.trigger = "minstatusbar"
  s.needApplyReContentAssist = true
  s.expansion = "mui.init({
	statusBarBackground:'\#${1:FFFFFF}'
})"
  end 
  snippet "mui.init({预加载数量})" do |s|
  s.trigger = "minprelimit"
  s.needApplyReContentAssist = true
  s.expansion = "preloadLimit:${1:5}"
  end 
#plus
 snippet "plusReady" do |s|
      s.trigger = "pready"
      s.expansion = "function plusReady(){
    $0
}
if (window.plus) {
    plusReady()
} else{
    document.addEventListener('plusready',plusReady,false);
}"
      s.needApplyReContentAssist = true
  end
    snippet "plus.accelerometer" do |s|
      s.trigger = "pacce"
      s.expansion = "plus.accelerometer."
      s.needApplyReContentAssist = true
  end
    snippet "plus.audio" do |s|
      s.trigger = "paudio"
      s.expansion = "plus.audio."
      s.needApplyReContentAssist = true
  end
    snippet "plus.barcode" do |s|
      s.trigger = "pbarcode"
      s.expansion = "plus.barcode."
      s.needApplyReContentAssist = true
  end
    snippet "plus.camera" do |s|
      s.trigger = "pcamera"
      s.expansion = "plus.camera."
      s.needApplyReContentAssist = true
  end
    snippet "plus.contacts" do |s|
      s.trigger = "pcontacts"
      s.expansion = "plus.contacts."
      s.needApplyReContentAssist = true
  end
    snippet "plus.device" do |s|
      s.trigger = "pdevice"
      s.expansion = "plus.device."
      s.needApplyReContentAssist = true
  end
    snippet "plus.gallery" do |s|
      s.trigger = "pgallery"
      s.expansion = "plus.gallery."
      s.needApplyReContentAssist = true
  end
    snippet "plus.geolocation" do |s|
      s.trigger = "pgeolocation"
      s.expansion = "plus.geolocation."
      s.needApplyReContentAssist = true
  end
    snippet "plus.io" do |s|
      s.trigger = "pio"
      s.expansion = "plus.io."
      s.needApplyReContentAssist = true
  end
    snippet "plus.key" do |s|
      s.trigger = "pkey"
      s.expansion = "plus.key."
      s.needApplyReContentAssist = true
  end
    snippet "plus.maps" do |s|
      s.trigger = "pmaps"
      s.expansion = "plus.maps."
      s.needApplyReContentAssist = true
  end
    snippet "plus.messaging" do |s|
      s.trigger = "pmessaging"
      s.expansion = "plus.messaging."
      s.needApplyReContentAssist = true
  end
    snippet "plus.nativeObj" do |s|
      s.trigger = "pnativeObj"
      s.expansion = "plus.nativeObj."
      s.needApplyReContentAssist = true
  end
    snippet "plus.nativeUI" do |s|
      s.trigger = "pnativeUI"
      s.expansion = "plus.nativeUI."
      s.needApplyReContentAssist = true
  end
    snippet "plus.navigator" do |s|
      s.trigger = "pnavigator"
      s.expansion = "plus.navigatorsc."
      s.needApplyReContentAssist = true
  end
    snippet "plus.orientation" do |s|
      s.trigger = "porientation"
      s.expansion = "plus.orientation."
      s.needApplyReContentAssist = true
  end
    snippet "plus.payment" do |s|
      s.trigger = "ppayment"
      s.expansion = "plus.payment."
      s.needApplyReContentAssist = true
  end
    snippet "plus.proximity" do |s|
      s.trigger = "pproximity"
      s.expansion = "plus.proximity."
      s.needApplyReContentAssist = true
  end
    snippet "plus.push" do |s|
      s.trigger = "ppush"
      s.expansion = "plus.push."
      s.needApplyReContentAssist = true
  end
    snippet "plus.runtime" do |s|
      s.trigger = "pruntime"
      s.expansion = "plus.runtime."
      s.needApplyReContentAssist = true
  end
    snippet "plus.share" do |s|
      s.trigger = "pshare"
      s.expansion = "plus.share."
      s.needApplyReContentAssist = true
  end
    snippet "plus.speech" do |s|
      s.trigger = "pspeech"
      s.expansion = "plus.speech.$0"
      s.needApplyReContentAssist = true
  end
    snippet "plus.net" do |s|
      s.trigger = "pnet"
      s.expansion = "plus.net."
      s.needApplyReContentAssist = true
  end
    snippet "plus.zip" do |s|
      s.trigger = "pzip"
      s.expansion = "plus.zip."
      s.needApplyReContentAssist = true
  end
    snippet "plus.networkinfo" do |s|
      s.trigger = "pnetworkinfo"
      s.expansion = "plus.networkinfo."
      s.needApplyReContentAssist = true
  end
    snippet "plus.display" do |s|
      s.trigger = "pdisplay"
      s.expansion = "plus.display."
      s.needApplyReContentAssist = true
  end
    snippet "plus.Screen" do |s|
      s.trigger = "pScreen"
      s.expansion = "plus.Screen."
      s.needApplyReContentAssist = true
  end
    snippet "plus.os" do |s|
      s.trigger = "pos"
      s.expansion = "plus.os."
      s.needApplyReContentAssist = true
  end
    snippet "plus.oauth" do |s|
      s.trigger = "poauth"
      s.expansion = "plus.oauth."
      s.needApplyReContentAssist = true
  end
    snippet "plus.oauth" do |s|
      s.trigger = "poauth"
      s.expansion = "plus.oauth."
      s.needApplyReContentAssist = true
  end
    snippet "plus.statistic" do |s|
      s.trigger = "pstatistic"
      s.expansion = "plus.statistic."
      s.needApplyReContentAssist = true
  end
    snippet "plus.storage" do |s|
      s.trigger = "pstorage"
      s.expansion = "plus.storage."
      s.needApplyReContentAssist = true
  end
    snippet "plus.uploader" do |s|
      s.trigger = "puploader"
      s.expansion = "plus.uploader."
      s.needApplyReContentAssist = true
  end
    snippet "plus.android" do |s|
      s.trigger = "pandroid"
      s.expansion = "plus.android."
      s.needApplyReContentAssist = true
  end
    snippet "plus.ios" do |s|
      s.trigger = "pios"
      s.expansion = "plus.ios."
      s.needApplyReContentAssist = true
  end
    snippet "plus.oauth" do |s|
      s.trigger = "poauth"
      s.expansion = "plus.oauth."
      s.needApplyReContentAssist = true
  end
    snippet "plus.downloader" do |s|
      s.trigger = "pdown"
      s.expansion = "plus.downloader."
      s.needApplyReContentAssist = true
  end
#mui
    snippet "mui.plusReady()" do |s|
      s.trigger = "mplusready"
      s.expansion = "mui.plusReady(function () {
    $1
})$0"
  end
    snippet "mui.ready" do |s|
      s.trigger = "mready"
      s.expansion = " mui.ready(function () {
   	$0
   })"
      s.needApplyReContentAssist = true
  end
    snippet "mui.open" do |s|
      s.trigger = "mopen"
      s.expansion = "mui.openWindow('${1:url}','${2:id}',{$3})"
      s.needApplyReContentAssist = true
  end
    snippet "mui.currentWebview" do |s|
      s.trigger = "mcurrent"
      s.expansion = "mui.currentWebview."
      s.needApplyReContentAssist = true
  end

    snippet "mui.back()(返回上级页面)" do |s|
      s.trigger = "mback"
      s.expansion = "mui.back()$0"
  end
    snippet "mui.backFunction(重写返回逻辑)" do |s|
      s.trigger = "mbackfunction"
      s.expansion = "mui.back=function () {
    $0	
}"
  end
    snippet "mui.backDouble(双击退出应用)" do |s|
      s.trigger = "mbackDouble"
      s.expansion = "//首页返回键处理
//处理逻辑：1秒内，连续两次按返回键，则退出应用；
var first = null;
mui.back = function() {
	//首次按键，提示‘再按一次退出应用’
	if (!first) {
		first = new Date().getTime();
		mui.toast('再按一次退出应用');
		setTimeout(function() {
			first = null;
		}, 1000);
	} else {
		if (new Date().getTime() - first < 1000) {
			plus.runtime.quit();
		}
	}
};"
  end
    snippet "mui.backTask(双击进入后台)" do |s|
      s.trigger = "mbackMoveTaskToBack"
      s.expansion = "//首页返回键处理
//处理逻辑：1秒内，连续两次按返回键，则进入后台；
var first = null;
mui.back = function() {
	//首次按键，提示‘再按一次退出应用’
	if (!first) {
		first = new Date().getTime();
		mui.toast('再按一次退出应用');
		setTimeout(function() {
			first = null;
		}, 1000);
	} else {
		if (new Date().getTime() - first < 1000) {
			var main = plus.android.runtimeMainActivity();
            main.moveTaskToBack(false);
		}
	}
};"
  end
    snippet "mui.preload()" do |s|
      s.trigger = "mpreload"
      s.expansion = "mui.preload({
	url:'${1:url}',
	id:'${2:id}',
	styles:{$3},//窗口参数
	extras:{$4}//自定义扩展参数
})$0"
      s.needApplyReContentAssist = true
  end
    snippet "clogios" do |s|
      s.trigger = "cloios"
      s.expansion = "console.log(JSON.stringify(${1:e}));
console.log('${2:e}');"
      s.needApplyReContentAssist = true
  end
    snippet "mui.os" do |s|
      s.trigger = "mos"
      s.expansion = "mui.os."
      s.needApplyReContentAssist = true
  end
    snippet "mui.mask" do |s|
      s.trigger = "mmask"
      s.expansion = "var ${1:mask} = mui.createMask(function () {
	$2
})
${1:mask}.show()"
  end
    snippet "mui('').pullRefresh" do |s|
      s.needApplyReContentAssist = true
      s.trigger = "mmpullrefresh"
      s.expansion = "mui('\#${1:refreshContainer}').pullRefresh().$2"
  end
    snippet "func" do |s|
      s.trigger = "func"
      s.expansion = "function $1($2) {
  $3
}"
  end
end


 #=====MUI Css代码块========================
with_defaults :scope => "source.css" do
  snippet "console.log();" do |s|
    s.trigger = "clog"
    s.expansion = "console.log($1);"
  end
end

