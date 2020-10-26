class AddDealToAccountOperations < ActiveRecord::Migration::Current
  def change
    add_reference :account_operations, :deal, foreign_key: true
  end
end
