class CreatePluginSettings < ActiveRecord::Migration[5.2]
  def change
    create_table :plugin_settings do |t|
      t.references :plugin_property, foreign_key: true
      t.references :tenant, foreign_key: true
      t.string :value
    end
  end
end
