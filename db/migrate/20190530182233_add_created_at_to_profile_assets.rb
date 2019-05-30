class AddCreatedAtToProfileAssets < ActiveRecord::Migration[5.2]
  def change
    add_column :profile_assets, :created_at, :datetime
  end
end
