class AddUpdatedAtToProfileAssets < ActiveRecord::Migration[5.2]
  def change
    add_column :profile_assets, :updated_at, :datetime
  end
end
