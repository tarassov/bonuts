class RemoveTableStacks < ActiveRecord::Migration[5.2]
  def change
    drop_table :table_stacks
  end
end
