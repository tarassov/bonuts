class AddToProfileAssets < ActiveRecord::Migration[6.1]
  def change
    add_column :profile_assets, :deleted, :boolean
  end
end
