# frozen_string_literal: true

class CreateDonuts < ActiveRecord::Migration[5.2]
  def change
    create_table :donuts do |t|
      t.references :tenant, foreign_key: true
      t.references :user, foreign_key: true
      t.integer :price
      t.datetime :expiration_date
      t.string :name
      t.boolean :active
      t.timestamps
    end
  end
end
