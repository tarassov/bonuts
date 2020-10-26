class RemoveUserFromDonuts < ActiveRecord::Migration::Current
  def change
    remove_column :donuts, :user_id
    add_reference :donuts, :profile, foreign_key: true
  end
end
