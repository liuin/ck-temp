=begin 
本文档是HBuilder预置的js代码块的文件。注意不要把其他语言的设置放到js里来。
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

with_defaults :scope => "source.js" do   #=====JS代码块编辑===============================
  
  snippet t(:object_method) do |s|
    s.trigger = ":f"
    s.expansion = "${1:method_name}: function(${2:attribute}){
	$0
}${3:,}"
  end
  
  snippet "function" do |s|
    s.trigger = "funn"
    s.expansion = "function ${1:function_name} ($2) {
	$0
}"
  end
  
  snippet t(:function_anonymous) do |s|
    s.trigger = "funan"
    s.expansion = "function ($1) {
	$0
}"
  end
  
  snippet t(:function_closures) do |s|
    s.trigger = "funcl"
    s.expansion = "(function ($1) {
	$0
})($2)"
  end
  
  snippet t(:prototype) do |s|
    s.trigger = "proto"
    s.expansion = "${1:class_name}.prototype.${2:method_name} = function(${3:first_argument}) {
	${0:// body...}
};
"
  end
  
  snippet t(:if) do |s|
    s.trigger = "iff"
    s.expansion = "if ($1) {
	$0
}"
  end
  
  snippet t(:if_else) do |s|
    s.trigger = "ife"
    s.expansion = "if ($1) {
	$0
} else{
	
}"
  end


  snippet t(:if_compare) do |s|
    s.trigger = "ifc"
    s.expansion = "if ($1 == ${2:true}) {
	$0
} else{
	
}"
  end
  
  snippet t(:for) do |s|
    s.trigger = "forr"
    s.expansion = "for ($1) {
	$0
}"
  end

  snippet t(:fori) do |s|
    s.trigger = "fori"
    s.expansion = "for (var i = 0; i < ${1:Things}.length; i++) {
	${1:Things}[i]
}"
  end
  
  snippet t(:with) do |s|
    s.trigger = "withh"
    s.expansion = "with ($1){
	$0
}"
  end
  snippet t(:typeof) do |s|
    s.trigger = "typeoff"
    s.expansion = 'typeof($1)=="${2:undefined/boolean/function/number/object/string}"'
  end  

  snippet t(:typeof!) do |s|
    s.trigger = "typeof!"
    s.expansion = 'typeof($1)!="${2:undefined/boolean/function/number/object/string}"'
  end  

  snippet t(:switch_case) do |s|
    s.trigger = "switchcase"
    s.expansion = "switch (${1}){
	case ${2:value}:
		break;
	default:
		break;
}"
  end
  
  snippet "while" do |s|
    s.trigger = "whilee"
    s.expansion = "while (${1:condition}){
	$0
}"
  end

  snippet "var i=0;" do |s|
  s.trigger = "vari"
  s.expansion = "var ${1:i}=${2:0};"
  end
  
  snippet "var s=\"\";" do |s|
  s.trigger = "vars"
  s.expansion = "var ${1:s}=\"$2\";"
  end
  
  snippet "var a=[];" do |s|
  s.trigger = "vara"
  s.expansion = "var ${1:a}=[$2];"
  end
  
  snippet "var l=a.length;" do |s|
  s.trigger = "varl"
  s.expansion = "var ${1:l}=${2:a}.length;"
  end

  snippet "var c = canvas" do |s|
    s.trigger = "varc"
    s.expansion = "var ${2:c} = document.getElementById(\"$1\").getContext(\"2d\");"
    s.needApplyReContentAssist = true
  end

  snippet "var xhr" do |s|
    s.trigger = "varxhr"
    s.expansion = "var ${1:xhr} = new XMLHttpRequest();
xhr.open(\"${2:GET/POST/PUT}\",\"$3\",${4:true/false});"
  end
  
  snippet "return true;" do |s|
  s.trigger = "returntrue"
  s.expansion = "return true;"
  end

  snippet "return false;" do |s|
  s.trigger = "returnfalse"
  s.expansion = "return false;"
  end
  
  
  snippet "try{}catch(e)" do |s|
  s.trigger = "trycatch"
  s.expansion = "try{
	$0
}catch(e){
	//TODO handle the exception
}"
  end
  
  snippet "$ (document.getElementById)" do |s|
    s.trigger = "$$$"
    s.expansion = "document.getElementById(\"$1\")"
    s.needApplyReContentAssist = true
  end

  snippet '$("")' do |s|
    s.trigger = "dl"
    s.expansion = "$$(\"$1\")"
    s.needApplyReContentAssist = true
  end
  snippet '$("#")' do |s|
    s.trigger = "dlid"
    s.expansion = "$$(\"\#$1\")"
    s.needApplyReContentAssist = true
  end
  snippet '$(".")' do |s|
    s.trigger = "dlclass"
    s.expansion = "$$(\".$1\")"
    s.needApplyReContentAssist = true
  end
  
  snippet "use strict" do |s|
  	s.trigger = "use"
  	s.expansion = "\"use strict\"";
  end
  
  snippet "document.getElementById" do |s|
    s.trigger = "dgi"
    s.expansion = "document.getElementById(\"$1\")"
    s.needApplyReContentAssist = true
  end

  snippet "document.querySelectorAll" do |s|
    s.trigger = "dqs"
    s.expansion = "document.querySelectorAll(\"$1\")"
    s.needApplyReContentAssist = true
  end
  
  snippet "document.write" do |s|
    s.trigger = "dw"
    s.expansion = "document.write(\"$1\")"
  end

  snippet "navigator.userAgent;" do |s|
  s.trigger = "nuser"
  s.expansion = "navigator.userAgent"
  end
  
  snippet t(:object_value) do |s|
    s.trigger = ":,"
    s.expansion = "${1:value_name}:${0:value},"
  end
  
  snippet t(:object_key) do |s|
    s.trigger = ":"
    s.expansion = '${1:key}: ${2:"${3:value}"}${4:, }'
  end
  
  snippet t(:setTimeout) do |s|
    s.trigger = "timeout"
    s.expansion = "setTimeout(function() {$0}, ${1:10});"
  end
  
  snippet t(:object_method_string) do |s|
    s.trigger = ':f'
    s.expansion = "'${1:${2:#thing}:${3:click}}': function(element){
	$0
}${4:,}"
  end
  
  snippet "@type" do |s|
  	s.trigger = "@type"
  	s.locationType="JS_DOC"
  	s.expansion = "@type {${1:type}}"
  end
  
  snippet "@return" do |s|
  	s.trigger = "@return"
  	s.locationType="JS_DOC"
  	s.expansion = "@return {${1:type}}"
  end
  
  snippet "@extends" do |s|
  	s.trigger = "@extends"
  	s.locationType="JS_DOC"
  	s.expansion = "@extends {${1:parent_type}}"
  end
  
  snippet "@param" do |s|
  	s.trigger = "@param"
  	s.locationType="JS_DOC"
  	s.expansion = "@param {${1:type}} ${2:param_name}"
  end
  
  snippet "plus.webview" do |s|
	  s.trigger = "pweb"
	  s.expansion = "plus.webview."
	  s.needApplyReContentAssist = true
  end
  
  snippet "plus.nativeUI.alert" do |s|
	  s.trigger = "pnalert"
	  s.expansion = "plus.nativeUI.alert($1)"
  end
  
  snippet "Key:Value" do |s|
	s.trigger = "kv"
	s.expansion = "${1:key} : ${2:value}"
  end

# ECAMScript 6 代码块
  snippet "function*" do |s|
	s.trigger = "fung"
	s.version = "ECMAScript 6"
	s.expansion = "function* ${1:name}($2) {
	yield $0;
}"
  end
  
  snippet "Arrow function" do |s|
	s.trigger = "arrow"
	s.version = "ECMAScript 6"
	s.expansion = "($1) => {
	$0
}"
  end
  
  snippet "Class" do |s|
	s.trigger = "class"
	s.version = "ECMAScript 6"
	s.expansion = "class ${1:name} {
	constructor(${2:arg}) {
		$0
	}
	
}"
  end
  
  snippet "constructor" do |s|
    s.trigger = "cons"
    s.version = "ECMAScript 6"
    s.locationType="JS_INCLASSBODY"
    s.expansion = "constructor(${1:arg}) {
    $0
}"
  end
  
  snippet "Class Extends" do |s|
	s.trigger = "classextends"
	s.version = "ECMAScript 6"
	s.expansion = "class ${1:name} extends ${2:AnotherClass} {
	constructor(${3:arg}) {
		$0
	}
	
}"
  end
  
  snippet "for...of" do |s|
	s.trigger = "forof"
	s.version = "ECMAScript 6"
	s.expansion = "for (let ${1:s} of ${2:sequence}) {
	$0
}"
  end
  
  snippet "for let" do |s|
	s.trigger = "forl"
	s.version = "ECMAScript 6"
    s.expansion = "for (let i = 0; i < ${1:Things}.length; i++) {
	${1:Things}[i]
}"
  end
  
  snippet "for let in" do |s|
	s.trigger = "forli"
	s.version = "ECMAScript 6"
    s.expansion = "for (let ${1:var1} in ${2:var2}) {
	$0
}"
  end
  
  snippet "Import" do |s|
	s.trigger = "import"
	s.version = "ECMAScript 6"
	s.expansion = "import ${1:foo} from \"${2:bar}\""
  end
  
  snippet "Export" do |s|
	s.trigger = "export"
	s.version = "ECMAScript 6"
	s.expansion = "export ${1:default} ${2:bar}"
  end
  
  snippet "Export Class" do |s|
	s.trigger = "exportclass"
	s.version = "ECMAScript 6"
	s.expansion = "export class ${1:name} {
	$0
}"
  end
  
  snippet "Getter" do |s|
	s.trigger = "getter"
	s.version = "ECMAScript 6"
  s.locationType="JS_INCLASSBODY"
	s.expansion = "get ${1:name}() {
	$0
}"
  end
  
  snippet "Setter" do |s|
	s.trigger = "setter"
	s.version = "ECMAScript 6"
  s.locationType="JS_INCLASSBODY"
	s.expansion = "set ${1:property}(${2:value}) {
	$0
}"
  end
  
end


with_defaults :scope => "source.js", :input => :none, :output => :insert_as_snippet do |bundle|
=begin
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
end