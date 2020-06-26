class CreateDeals < ActiveRecord::Migration[5.2]
  def change
    create_table :deals do |t|
      t.string :comment
      t.references :profile, foreign_key: true
      t.datetime :created_at
    end
  end
end
