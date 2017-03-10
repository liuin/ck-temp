=begin 
本文档是HBuilder预置的微信js sdk代码块的文件。注意不要把其他语言的设置放到这里来。
如果用户修改此文档，HBuilder升级后会覆盖用户的修改，建议进入菜单 工具→扩展代码块 扩展相应的代码块。
若修改本文档，需要重启才能生效。修改过程中注意备份。

脚本开源地址 https://github.com/dcloudio/HBuilderRubyBundle

1、编辑代码块
如果要新增一个代码块，复制如下一段代码到空白行，然后设定参数。
snippet "document.getElementById" do |s|            #'document.getElementById'是代码块的显示名字；
    s.trigger = "dgi"                               #'dgi' 是激活字符，比如输入dgi均会在代码提示时显示该代码块；
    s.expansion = "document.getElementById(\"$1\")" #expansion是设定该代码块的输出字符，其中$0、$1是光标的停留和切换位置。
                                                    #如果输出涉及到换行和tab，也需严格在这里使用换行和tab。
                                                    #输出双引号在前面加\来转义，输出$使用\$(单引号中)或\\$(双引号中)转义
    s.needApplyReContentAssist = true               #输入代码块后立即在$1位置激活代码提示助手
end

2、编辑按键命令
如果要新增一个按键操作命令，复制如下一段代码到空白行，然后设定参数。
  command t(:multicomment) do |cmd| #:首先起个名字,multicomment是名字
    cmd.key_binding = 'M1+M2+/' #这里绑定触发按键，这里是Ctrl+Shift+/
    cmd.input = :selection #输入内容是选中区域的内容
    cmd.invoke do |context|
      selection = ENV['TM_SELECTED_TEXT'] || ''
      # 如果选区长度大于0，则输出如下字符。回车符就使用真实回车。如下输出即在选中内容前后加上/* */的注释
      if selection.length > 0
        "/*
${1:#{selection}}
*/"
      end
    end
  end

=end

require 'ruble'

with_defaults :scope => "__sp__dftl_partition_content_type" do   #=====JSP代码块编辑===============================
  
  snippet "case" do |s|
      s.trigger = "case"
      s.locationType="JSP_SOURCE"
      s.description = "case"
      s.expansion = "case $1:
    $2
$0"
  end

  snippet "try catch" do |s|
      s.trigger = "tryc"
      s.locationType="JSP_SOURCE"
      s.description = "try catch"
      s.expansion = "try{
    $1
}catch (${2:Exception} ${3:e}) {
    $0
}"
  end  
    
  snippet "if" do |s|
      s.trigger = "if"
      s.description = "if"
      s.locationType="JSP_SOURCE"
      s.expansion = "if ($1) {
    $0
}"
  end
  
  snippet "ifelse" do |s|
      s.trigger = "ife"
      s.description = "if else"
      s.locationType="JSP_SOURCE"
      s.expansion = "if ($1) {
    $0
}else {
    
}"
  end

  snippet "else" do |s|
    s.trigger = "else"
    s.description = "else"
    s.locationType="JSP_SOURCE"
    s.expansion = "else {
    $0
}"
  end
  
  snippet "else if" do |s|
    s.trigger = "elseif"
    s.description = "else if"
    s.locationType="JSP_SOURCE"
    s.expansion = "else if ($1) {
    $0
}"
  end
  
  snippet "for each" do |s|
    s.trigger = "fore"
    s.description = "for (each)"
    s.locationType="JSP_SOURCE"
    s.expansion = "for ($1 : $2) {
    $0
}"
  end
  
  snippet "for" do |s|
    s.trigger = "for"
    s.description = "for"
    s.locationType="JSP_SOURCE"
    s.expansion = "for (int ${1:i} = 0; ${1:i}<${2:array}.length; ${1:i}++) {
    $0
}"
  end
  
  snippet "switch" do |s|
    s.trigger = "switch"
    s.description = "switch"
    s.locationType="JSP_SOURCE"
    s.expansion = "switch ($1) {
    $0
}"
  end   

  snippet "while" do |s|
    s.trigger = "while"
    s.description = "while"
    s.locationType="JSP_SOURCE"
    s.expansion = "while ($1) {
    $0
}"
  end
end
