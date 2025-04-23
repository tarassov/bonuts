FactoryBot.define do
  factory :plugin do
    name { Faker::Fantasy::Tolkien.race }

    transient do
      properties_count { 3 }
    end

    after(:create) do |plugin, evaluator|
      create_list(:plugin_property, evaluator.properties_count, plugin:)
    end
  end
end
