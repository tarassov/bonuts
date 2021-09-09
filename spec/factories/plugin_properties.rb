FactoryBot.define do
  factory :plugin_property do
    name { Faker::Name.name }
    plugin
  end
end
