class AddActivatedToInvitations < ActiveRecord::Migration[6.0]
  def change
    add_column :invitations, :activated, :boolean
  end
end
