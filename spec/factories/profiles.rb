# spec/factories/users.rb
FactoryBot.define do
  factory :profile do
    user
    tenant
    active { true }
  end
end
