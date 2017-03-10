require 'ruble'

command t(:decimal_to_octal) do |cmd|
  #cmd.key_binding = 'CONTROL+M2+8'
  cmd.output = :replace_selection
  cmd.input = :selection, :word
  cmd.invoke { STDIN.read.to_i.to_s(8) }
end
