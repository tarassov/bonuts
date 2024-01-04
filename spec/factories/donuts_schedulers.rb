FactoryBot.define do
  factory :donuts_scheduler do
    profile
    name { Faker::Name.name }
    comment { Faker::Quotes::Shakespeare.hamlet_quote }
    amount { Faker::Number.between(from: 1, to: 100)  }
    tenant
    active { true }
    execute_time { Faker::Time.between(from: DateTime.now - 1, to: DateTime.now) }
    timezone { Faker::Address.time_zone }
    burn_old { false }
    day { Faker::Number.between(from: 1, to: 31) }
    weekday { Faker::Number.between(from: 1, to: 7) }
  end
end
# frozen_string_literal: true
