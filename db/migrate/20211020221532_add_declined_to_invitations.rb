class AddDeclinedToInvitations < ActiveRecord::Migration[6.0]
  def change
    add_column :invitations, :declined, :boolean
  end
end
