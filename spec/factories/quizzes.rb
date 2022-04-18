FactoryBot.define do
  factory :quiz do
    name { Faker::GreekPhilosophers.name }
    description { Faker::GreekPhilosophers.name }
    tenant { nil }
    profile { nil }
    active { false }
    closed { false }
    deal
    public_uid { Faker::String.random(length: 3..12) }
    created_at { Faker::Date.between(from: 2.days.ago, to: Date.today) }
    updated_at { Faker::Date.between(from: 2.days.ago, to: Date.today) }


    factory :quiz_with_questions do

      transient do
        questions_count { 10 }
      end

      after(:create) do |quiz, evaluator|
        create_list(:quiz_question, evaluator.questions_count / 2, quiz: quiz, deal: quiz.deal)
        create_list(:quiz_question_with_options, evaluator.questions_count / 2, quiz: quiz, deal: quiz.deal)
      end
    end
  end
end
