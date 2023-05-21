FactoryBot.define do
  factory :circle do
    name { Faker::Name.name }
    tenant
    active { true }
  end
end
# frozen_string_literal: true
