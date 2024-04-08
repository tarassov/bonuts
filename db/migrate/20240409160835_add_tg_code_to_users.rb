class AddTgCodeToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :tg_code, :integer
  end
end
