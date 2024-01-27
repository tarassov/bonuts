module CustomMatchers
  extend RSpec::Matchers::DSL

  matcher :has_no_result_errors do
    match { |actual| actual.errors.count == 0 }

    failure_message do |actual|
      errors = if actual.errors.count > 0
                 actual.errors[:error]
               else
                 []
               end
      forbidden = if actual.errors.count > 0
                    actual.errors[:forbidden] || []
                  else
                    []
                  end
      "expected: 0\ngot: #{actual.errors.count}\n #{errors.join('\n ')} \n #{forbidden.join('\n ')}"
    end
  end

  matcher :has_result_errors do |expected|
    match { |actual| actual.errors.count == expected }

    failure_message do |actual|
      errors = if actual.errors.count > 0
                 actual.errors[:error] || []
               else
                 []
               end
      forbidden = if actual.errors.count > 0
                    actual.errors[:forbidden] || []
                  else
                    []
                  end
      "expected: #{expected}\ngot: #{actual.errors.count}\n #{errors.join('\n ')} \n#{forbidden.join('\n ')}"
    end
  end
end
