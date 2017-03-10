require 'ruble'

command t(:convert_to_hex) do |cmd|
  cmd.output = :replace_selection
  cmd.input = :selection, :right_character
  cmd.invoke do
    print $stdin.read.unpack("U*").map { |e| sprintf('0x%02x', e) }.join(' ')
  end
end
