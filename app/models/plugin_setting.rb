class PluginSetting < ApplicationRecord
  belongs_to :plugin
  belongs_to :tenant
  belongs_to :plugin_property
  belongs_to :tenant_plugin
end
