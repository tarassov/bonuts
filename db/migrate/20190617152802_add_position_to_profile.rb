# frozen_string_literal: true

class AddPositionToProfile < ActiveRecord::Migration::Current
  def change
    add_column :profiles, :position, :string
  end
end
