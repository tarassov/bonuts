class Plugin < ApplicationRecord
  has_many :plugin_properties, dependent: :destroy
  enum type: {
    notification: "notification",
  }

  class << self
    def get_prop(tenant_id, plugin_name, prop_name)
      PluginSetting.joins(:plugin, :plugin_property, :tenant_plugin).where(
        plugins: {
          name: plugin_name,
        },
        tenant_plugins: {
          tenant_id: tenant_id,
        },
        plugin_properties: {
          name: prop_name,
        },
      ).first
    end
  end
end
