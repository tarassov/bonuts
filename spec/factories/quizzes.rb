FactoryBot.define do
  factory :quiz do
    name { Faker::GreekPhilosophers.name } 
    description { Faker::GreekPhilosophers.name } 
    tenant { nil }
    profile { nil }
    active { false }
    closed { false }
    uuid { Faker::String.random(length: 3..12) }
    created_at {Faker::Date.between(from: 2.days.ago, to: Date.today) }
    updated_at {Faker::Date.between(from: 2.days.ago, to: Date.today) }

      # user_with_posts will create post data after the user has been created
      factory :quizz_with_questions do
        # posts_count is declared as a transient attribute and available in
        # attributes on the factory, as well as the callback via the evaluator
        transient do
          questions_count { 10 }
        end
  
        # the after(:create) yields two values; the user instance itself and the
        # evaluator, which stores all values from the factory, including transient
        # attributes; `create_list`'s second argument is the number of records
        after(:create) do |quizz, evaluator|          
          create_list(:quizz_question, evaluator.questions_count/2, quizz: quizz)
          create_list(:quizz_question_with_options, evaluator.questions_count/2, quizz: quizz)
        end
  
      end
  end
end
