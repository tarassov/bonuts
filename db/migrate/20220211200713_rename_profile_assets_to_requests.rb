class RenameProfileAssetsToRequests < ActiveRecord::Migration[6.1]
  def up
    rename_table :profile_assets, :requests
  end

  def down
    rename_table :requests, :profile_assets
  end
end
