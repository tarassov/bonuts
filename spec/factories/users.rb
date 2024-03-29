# spec/factories/users.rb
FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.unique.email }
    last_name { Faker::Name.unique.last_name }
    first_name { Faker::Name.first_name }
    password_digest { Faker::Internet.password(min_length: 8) }
    zone { Faker::Address.time_zone }
  end
end
