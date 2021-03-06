class CreateTableStack < ActiveRecord::Migration::Current
  def change
    create_table :table_stacks do |t|
      t.references :deal, foreign_key: true
      t.datetime :created_at
      t.references :stackable, polymorphic: true
    end
  end
end
