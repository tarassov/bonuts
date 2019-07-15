class AddDemoToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :demo, :boolean
  end
end
