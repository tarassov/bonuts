FactoryBot.define do
  factory :quiz do
    name { Faker::GreekPhilosophers.name } 
    description { Faker::GreekPhilosophers.name } 
    tenant { nil }
    profile { nil }
    active { false }
    closed { false }
    uuid { "MyString" }
    created_at { "2020-10-26 21:34:37" }
    updated_at { "2020-10-26 21:34:37" }
  end
end
