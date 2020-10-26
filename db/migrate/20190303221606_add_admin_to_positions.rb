# frozen_string_literal: true

class AddAdminToPositions < ActiveRecord::Migration::Current
  def change
    add_column :positions, :admin, :boolean
  end
end
