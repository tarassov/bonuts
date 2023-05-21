class RemoveProfileCircles < ActiveRecord::Migration[7.0]
  def remove
    drop_table :profile_circles
  end
end
