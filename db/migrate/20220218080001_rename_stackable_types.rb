class RenameStackableTypes < ActiveRecord::Migration[6.1]
  def up
    execute "update  stacks set stackable_type='Request' where stackable_type='ProfileAsset';" 
  end

  def down
      raise ActiveRecord::IrreversibleMigration
  end
end
