class CreatePlugins < ActiveRecord::Migration::Current
  def change
    create_table :plugins do |t|
      t.string :name
    end
  end
end
