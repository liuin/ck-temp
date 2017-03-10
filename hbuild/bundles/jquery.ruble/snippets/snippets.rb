=begin 
本文档是HBuilder预置的jquery代码块的文件。注意不要把其他语言的设置放到jquery里来。
如果用户修改此文档，HBuilder升级后会覆盖用户的修改，建议进入菜单 工具→扩展代码块 扩展相应的代码块。
若修改本文档，需要重启才能生效。修改过程中注意备份。

脚本开源地址 https://github.com/dcloudio/HBuilderRubyBundle

编辑代码块
如果要新增一个代码块，复制如下一段代码到空白行，然后设定参数。
snippet "$()" do |s|            #'$()'是代码块的显示名字；
    s.trigger = "dgi"                               #'dgi' 是激活字符，比如输入dgi均会在代码提示时显示该代码块；
    s.expansion = "document.getElementById(\"$1\")" #expansion是设定该代码块的输出字符，其中$0、$1是光标的停留和切换位置。
                                                    #如果输出涉及到换行和tab，也需严格在这里使用换行和tab。
                                                    #输出双引号在前面加\来转义，输出$使用\$(单引号中)或\\$(双引号中)转义
    s.needApplyReContentAssist = true               #输入代码块后立即在$1位置激活代码提示助手
end

=end
require 'ruble'

with_defaults :scope => 'source.js' do

snippet t(:select_dom_element) do |s|
  s.trigger = '$'
  s.expansion = '\$(${1:\'string\'/element/array/function/jQuery object/\'string\', context})$0'
end

snippet '$(this)' do |s|
  s.trigger = 'this'
  s.expansion = '\$(this)$0'
end

snippet '$.ajax' do |s|
  s.trigger = '$.ajax'
  s.expansion = '$$.ajax({
	type:"${1:get/post/put}",
	url:"$2",
	async:${3:true/false}
});'
end

end # source.js


with_defaults :scope => 'source.js meta.selector.jquery', :trigger => ':' do

snippet ':button' do |s|
  #s.key_binding = 'M4+M3+:'
  s.expansion = ':button'
end

snippet ':checkbox' do |s|
  #s.key_binding = 'M4+M3+:'
  s.expansion = ':checkbox'
end

snippet ':checked' do |s|
  #s.key_binding = 'M4+M3+:'
  s.expansion = ':checked'
end

snippet ':contains(\'test\')' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':contains(\'${1:test}\')$0'
end

snippet ':disabled' do |s|
  #s.key_binding = 'M4+M3+:'
  s.expansion = ':disabled'
end

snippet ':empty' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':empty'
end

snippet ':enabled' do |s|
  #s.key_binding = 'M4+M3+:'
  s.expansion = ':enabled'
end

snippet ':eq(n)' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':eq(${1:n})$0'
end

snippet ':even' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':even'
end

snippet ':file' do |s|
  #s.key_binding = 'M4+M3+:'
  s.expansion = ':file'
end

snippet ':first-child' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':first-child'
end

snippet ':first' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':first'
end

snippet ':gt(n)' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':gt(${1:n})$0'
end

snippet ':hidden' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':hidden
'
end

snippet ':image' do |s|
  #s.key_binding = 'M4+M3+:'
  s.expansion = ':image'
end

snippet ':input' do |s|
  #s.key_binding = 'M4+M3+:'
  s.expansion = ':input'
end

snippet ':last-child' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':last-child'
end

snippet ':last' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':last'
end

snippet ':lt(n)' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':lt(${1:n})$0'
end

snippet ':not(s)' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':not(${1:s})$0'
end

snippet ':nth-child(n)' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':nth-child(${1:n})$0'
end

snippet ':odd' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':odd'
end

snippet ':only-child' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':only-child'
end

snippet ':parent' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':parent
'
end

snippet ':password' do |s|
  #s.key_binding = 'M4+M3+:'
  s.expansion = ':password'
end

snippet ':radio' do |s|
  #s.key_binding = 'M4+M3+:'
  s.expansion = ':radio'
end

snippet ':reset' do |s|
  #s.key_binding = 'M4+M3+:'
  s.expansion = ':reset'
end

snippet ':root' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':root'
end

snippet ':selected' do |s|
  #s.key_binding = 'M4+M3+:'
  s.expansion = ':selected'
end

snippet ':submit' do |s|
  #s.key_binding = 'M4+M3+:'
  s.expansion = ':submit'
end

snippet ':text' do |s|
  #s.key_binding = 'M4+M3+:'
  s.expansion = ':text'
end

snippet ':visible' do |s|
  #s.key_binding = 'M4+:'
  s.expansion = ':visible
'
end

end # :scope => 'source.js meta.selector.jquery', :trigger => ':'