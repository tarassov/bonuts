FactoryBot.define do
  factory :question_option do
    sort_order {Faker::Number.within(range: 1..10) }
    quiz_question { nil }
    value {Faker::Movies::BackToTheFuture.character}
  end
end
