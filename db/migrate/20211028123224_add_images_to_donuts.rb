class AddImagesToDonuts < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.string :image
      t.datetime :created_at
      t.references :imageable, polymorphic: true, index: true
    end
  end
end
