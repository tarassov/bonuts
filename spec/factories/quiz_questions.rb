FactoryBot.define do
  factory :quiz_question do
    description  { Faker::Movies::BackToTheFuture.quote }  
    quiz { nil }
    obligatory { Faker::Boolean.boolean}
    from { 0 }
    to { 0 }

    factory :quizz_question_with_options do
      after(:create) do |question|       
        create_list(:question_option, 4, tenant: quizz_question: question)  
      end
    end
  end
end
