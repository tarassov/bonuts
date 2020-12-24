class AddPluginToPluginSettings < ActiveRecord::Migration::Current
  def change
    add_reference :plugin_settings, :plugin, foreign_key: true
  end
end
