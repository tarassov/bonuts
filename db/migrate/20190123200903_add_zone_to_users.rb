class AddZoneToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :zone, :string
  end
end