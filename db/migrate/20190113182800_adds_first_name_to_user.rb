class AddsFirstNameToUser < ActiveRecord::Migration::Current
  def change
    add_column :users, :last_name, :string
    add_column :users, :first_name, :string
    add_column :users, :notes, :string
    add_column :users, :sex, :string
  end
end
