# frozen_string_literal: true

class AddZoneToUsers < ActiveRecord::Migration::Current
  def change
    add_column :users, :zone, :string
  end
end
