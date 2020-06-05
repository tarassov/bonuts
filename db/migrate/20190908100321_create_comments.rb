# frozen_string_literal: true

class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.references :profile, foreign_key: true
      t.references :commentable, polymorphic: true, index: true
      t.datetime :created_at
      t.datetime :updated_at
      t.string :text
    end
  end
end
