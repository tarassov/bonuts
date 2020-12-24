# frozen_string_literal: true

class DropTablePositions < ActiveRecord::Migration::Current
  def change
    drop_table :positions
  end
end
