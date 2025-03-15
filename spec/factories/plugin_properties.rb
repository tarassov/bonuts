FactoryBot.define do
  factory :plugin_property do
    name { Faker::Games::Witcher.location }
    plugin
  end
end
