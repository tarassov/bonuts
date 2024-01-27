# spec/factories/users.rb
FactoryBot.define do
  factory :profile do
    user
    tenant
    position { Faker::Fantasy::Tolkien.race }
    active { true }
  end
end
