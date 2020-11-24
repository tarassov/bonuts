module CustomMatchers
    extend RSpec::Matchers::DSL
  
    matcher :has_no_result_errors do 
      match {|actual| actual.errors.count == 0}
  
      failure_message  do |actual|
        "expected: 0\ngot: #{actual.errors.count}\n #{actual.errors[:error].join('\n ')}"
      end
    end

    matcher :has_result_errors do |expected|
        match {|actual| actual.errors.count == expected}
    
        failure_message  do |actual|
           if actual.errors.count >0  
                errors = actual.errors[:error]
           else
                errors = Array.new
           end
          "expected: #{expected}\ngot: #{actual.errors.count}\n #{errors.join('\n ')}"
        end
      end

  end
  