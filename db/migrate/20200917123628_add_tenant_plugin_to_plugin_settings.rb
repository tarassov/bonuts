class AddTenantPluginToPluginSettings < ActiveRecord::Migration::Current
  def change
    add_reference :plugin_settings, :tenant_plugin, foreign_key: true
  end
end
