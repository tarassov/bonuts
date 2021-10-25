class AddClosedToInvitations < ActiveRecord::Migration[6.0]
  def change
    add_column :invitations, :closed, :boolean
  end
end
