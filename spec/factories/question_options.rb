FactoryBot.define do
  factory :question_option do
    sort_order { "" }
    quiz_question { nil }
    value { "MyString" }
  end
end
