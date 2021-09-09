FactoryBot.define do
  factory :plugin_setting do
    value { Faker::GreekPhilosophers.name }
    plugin
    tenant
    plugin_property
    tenant_plugin
  end
end
