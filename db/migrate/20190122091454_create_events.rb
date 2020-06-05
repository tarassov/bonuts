# frozen_string_literal: true

class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.references :tenant, foreign_key: true
      t.references :user, foreign_key: true
      t.references :account, foreign_key: true
      t.string :content
      t.string :string
      t.string :extra_content
    end
  end
end
