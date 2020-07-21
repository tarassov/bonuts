class CreateStack < ActiveRecord::Migration[5.2]
  def change
    create_table :stacks do |t|
      t.references :deal, foreign_key: true
      t.references :stackable, polymorphic: true
    end
  end
end
