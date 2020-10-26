FactoryBot.define do
  factory :quiz_question do
    description  { Faker::GreekPhilosophers.name }  
    quiz { nil }
    obligatory { false }
    from { 0 }
    to { 0 }
  end
end
