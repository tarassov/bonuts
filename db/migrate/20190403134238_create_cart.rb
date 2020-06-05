# frozen_string_literal: true

class CreateCart < ActiveRecord::Migration[5.2]
  def change
    create_table :carts do |t|
      t.references :profile, foreign_key: true
      t.references :donut, foreign_key: true
      t.datetime :date_create
      t.datetime :date_used
      t.timestamps
    end
  end
end
