class AddRecoverTokenToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :recover_token, :string
  end
end
