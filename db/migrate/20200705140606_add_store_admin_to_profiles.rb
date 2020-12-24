class AddStoreAdminToProfiles < ActiveRecord::Migration::Current
  def change
    add_column :profiles, :store_admin, :boolean
  end
end
