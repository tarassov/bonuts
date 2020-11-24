module CustomMatchers
    extend RSpec::Matchers::DSL
  
    matcher :has_no_errors do 
      match {|actual| actual.errors.count == 0}
  
      failure_message  do |actual|
        "expected: 0,\ngot: #{actual.errors.count}\n #{actual.errors[:error].join('\n ')}"
      end
    end
  end
  