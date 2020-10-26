# frozen_string_literal: true

class AddTenantToAccounts < ActiveRecord::Migration::Current
  def change
    add_reference :accounts, :tenant, foreign_key: true
  end
end
