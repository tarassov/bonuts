class CreatePlugins < ActiveRecord::Migration[5.2]
  def change
    create_table :plugins do |t|
      t.string :name
    end
  end
end
