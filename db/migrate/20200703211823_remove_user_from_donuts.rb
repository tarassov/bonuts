class RemoveUserFromDonuts < ActiveRecord::Migration[5.2]
  def change
    remove_column :donuts, :user_id
    add_reference :donuts, :profile, foreign_key: true
  end
end
