class AddPublicUidToProfileAssets < ActiveRecord::Migration[5.2]
  def change
    add_column :profile_assets, :public_uid, :string
    add_index  :profile_assets, :public_uid
  end
end
