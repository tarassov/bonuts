# frozen_string_literal: true

class CreatePositions < ActiveRecord::Migration::Current
  def change
    create_table :positions do |t|
      t.references :department, foreign_key: true
      t.references :user, foreign_key: true
      t.string :position
    end
  end
end
