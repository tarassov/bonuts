class CreatePluginSettings < ActiveRecord::Migration::Current
  def change
    create_table :plugin_settings do |t|
      t.references :plugin_property, foreign_key: true
      t.references :tenant, foreign_key: true
      t.string :value
    end
  end
end
