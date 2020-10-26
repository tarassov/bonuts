# frozen_string_literal: true

class AddActiveToProfile < ActiveRecord::Migration::Current
  def change
    add_column :profiles, :active, :boolean
  end
end
