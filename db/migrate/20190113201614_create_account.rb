# frozen_string_literal: true

class CreateAccount < ActiveRecord::Migration[5.2]
  def change
    create_table :accounts do |t|
      t.string :type
      t.references :user, foreign_key: true
    end
  end
end
