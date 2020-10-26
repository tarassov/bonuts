class CreateAccountOperationMigration < ActiveRecord::Migration::Current
  def change
    create_table :account_operations do |t|
      t.integer :amount
      t.integer :direction
      t.references :parent_operation, foreign_key: { to_table: :account_operations }
    end
  end
end
