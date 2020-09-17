class AddTenantPluginToPluginSettings < ActiveRecord::Migration[5.2]
  def change
    add_reference :plugin_settings, :tenant_plugin, foreign_key: true
  end
end
