require 'ruble'

command t(:loadlog) do |cmd|
  #cmd.key_binding ='M1+M2+='
  cmd.output = :discard
  cmd.input = :none
  cmd.invoke do |context|
    include_class("java.lang.System")
    System.out.println("Ruby第一次加载完成...")
  end
end


