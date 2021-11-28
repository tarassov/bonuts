FactoryBot.define do
  factory :tenant_plugin do
    plugin
    tenant
    active { false }

    after(:create) do |tenant_plugin, _evaluator|
      tenant_plugin.plugin.plugin_properties.each do |property|
        create(:plugin_setting, plugin: tenant_plugin.plugin, tenant: tenant_plugin.tenant,
                                plugin_property: property, tenant_plugin: tenant_plugin)
      end
    end
  end
end
