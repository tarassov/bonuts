class AddsActiveToCircles < ActiveRecord::Migration[7.0]
  def change
    add_column :circles, :active, :boolean
  end
end
