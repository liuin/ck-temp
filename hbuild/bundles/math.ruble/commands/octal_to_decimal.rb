require 'ruble'

command t(:octal_to_decimal) do |cmd|
  #cmd.key_binding = 'CONTROL+M2+0'
  cmd.output = :replace_selection
  cmd.input = :selection, :word
  cmd.invoke { STDIN.read.oct }
end
