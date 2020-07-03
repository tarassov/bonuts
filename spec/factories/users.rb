# spec/factories/users.rb
FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.unique.safe_email }
    last_name { Faker::Name.unique.last_name   }
    first_name { Faker::Name.first_name }
    password_digest { Faker::Internet.password(min_length: 8) }
  end
end
