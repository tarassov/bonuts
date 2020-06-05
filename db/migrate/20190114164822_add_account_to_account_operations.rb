# frozen_string_literal: true

class AddAccountToAccountOperations < ActiveRecord::Migration[5.2]
  def change
    add_reference :account_operations, :account, foreign_key: true
  end
end
