class CreatePluginProperties < ActiveRecord::Migration::Current
  def change
    create_table :plugin_properties do |t|
      t.references :plugin, foreign_key: true
      t.string :name
      t.string :notes
    end
  end
end
