class AddTenantToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_reference :accounts, :tenant, foreign_key: true
  end
end
