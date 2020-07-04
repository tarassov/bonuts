class AddDealToProfileAssets < ActiveRecord::Migration[5.2]
  def change
    add_reference :profile_assets, :deal, foreign_key: true
  end
end
