require 'ruble'

command t(:hex_to_decimal) do |cmd|
  #cmd.key_binding = 'CONTROL+M2+9'
  cmd.output = :replace_selection
  cmd.input = :selection, :word
  cmd.invoke { STDIN.read.hex }
end
