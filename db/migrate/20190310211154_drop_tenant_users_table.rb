class DropTenantUsersTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :tenants_users
  end
end
