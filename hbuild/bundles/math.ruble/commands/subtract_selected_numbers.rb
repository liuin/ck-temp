require 'ruble'

command t(:subtract_numbers) do |cmd|
  #cmd.key_binding = 'CONTROL+M2+I'
  cmd.output = :insert_as_text
  cmd.input = :selection, :line
  cmd.invoke do
    numbers = $stdin.read.gsub(/[$ۣ]/, '').scan(/((?:\b|-)[0-9]+(?:\.[0-9]+)?)\b/)
    print " = " + numbers[1..-1].inject(numbers.first.first.to_f) { |t,s| t - s[0].to_f() }.to_s.sub(/.0+\z/, '')
  end
end
