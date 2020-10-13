class AddPluginToPluginSettings < ActiveRecord::Migration[5.2]
  def change
    add_reference :plugin_settings, :plugin, foreign_key: true
  end
end
