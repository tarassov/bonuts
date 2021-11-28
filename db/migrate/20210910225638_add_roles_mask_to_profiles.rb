class AddRolesMaskToProfiles < ActiveRecord::Migration[6.0]
  def change
    add_column :profiles, :roles_mask, :integer
  end
end
