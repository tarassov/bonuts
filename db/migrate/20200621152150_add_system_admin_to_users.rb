class AddSystemAdminToUsers < ActiveRecord::Migration::Current
  def change
    add_column :users, :system_admin, :boolean
  end
end
