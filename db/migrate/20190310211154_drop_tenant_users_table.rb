# frozen_string_literal: true

class DropTenantUsersTable < ActiveRecord::Migration::Current
  def change
    drop_table :tenants_users
  end
end
