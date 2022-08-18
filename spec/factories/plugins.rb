FactoryBot.define do
  factory :plugin do
    name { Faker::Name.name }

    transient do
      properties_count { 5 }
    end

    after(:create) do |plugin, evaluator|
      create_list(:plugin_property, evaluator.properties_count, plugin:)
    end
  end
end
