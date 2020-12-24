# frozen_string_literal: true

class AddProfileToPositions < ActiveRecord::Migration::Current
  def change
    add_reference :positions, :profile, foreign_key: true
  end
end
