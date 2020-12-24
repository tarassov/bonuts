class RemoveTableStacks < ActiveRecord::Migration::Current
  def change
    drop_table :table_stacks
  end
end
