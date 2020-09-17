FactoryBot.define do
    factory :plugin_setting do
      value { Faker::Name.name }  
      plugin   
      tenant
      plugin_property
      tenant_plugin
    end
  end
  