# frozen_string_literal: true

class AddProfileToPositions < ActiveRecord::Migration[5.2]
  def change
    add_reference :positions, :profile, foreign_key: true
  end
end
