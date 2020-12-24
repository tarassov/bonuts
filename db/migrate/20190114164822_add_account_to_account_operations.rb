# frozen_string_literal: true

class AddAccountToAccountOperations < ActiveRecord::Migration::Current
  def change
    add_reference :account_operations, :account, foreign_key: true
  #  add_reference :account_operations, :parent_operation, foreign_key: { to_table: :account_operations }


  end
end
