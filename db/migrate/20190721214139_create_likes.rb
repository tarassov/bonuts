# frozen_string_literal: true

class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.references :profile, foreign_key: true
      t.datetime :created_at
      t.references :likeable, polymorphic: true, index: true
    end
  end
end
