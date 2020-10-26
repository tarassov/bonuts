class AddDealToProfileAssets < ActiveRecord::Migration::Current
  def change
    add_reference :profile_assets, :deal, foreign_key: true
  end
end
