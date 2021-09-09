FactoryBot.define do
  factory :donut do
    name { Faker::Name.name }
    tenant
    profile
    active { true }
    price { Faker::Number.between(from: 1, to: 1000) }
  end
end
