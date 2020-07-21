class AddDealToAccountOperations < ActiveRecord::Migration[5.2]
  def change
    add_reference :account_operations, :deal, foreign_key: true
  end
end
