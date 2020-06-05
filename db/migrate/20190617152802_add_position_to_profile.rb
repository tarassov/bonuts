# frozen_string_literal: true

class AddPositionToProfile < ActiveRecord::Migration[5.2]
  def change
    add_column :profiles, :position, :string
  end
end
