class AddEmailIndexToUsers < ActiveRecord::Migration[7.0]
  def change
    add_index(:users, :email, name: "index_user_on_email", unique: true)
  end
end
