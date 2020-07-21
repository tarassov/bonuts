class AddSystemAdminToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :system_admin, :boolean
  end
end
