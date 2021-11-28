FactoryBot.define do
  factory :deal do
    profile
    comment { Faker::Commerce.department }
    deal_type { Faker::Commerce.department }
  end
end
