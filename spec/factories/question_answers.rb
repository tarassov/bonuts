FactoryBot.define do
  factory :question_answer do
    quiz_question { nil }
    profile { nil }
    value { "MyString" }
    anonymous { false }
  end
end
