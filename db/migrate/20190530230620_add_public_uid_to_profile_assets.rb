# frozen_string_literal: true

class AddPublicUidToProfileAssets < ActiveRecord::Migration::Current
  def change
    add_column :profile_assets, :public_uid, :string
    add_index  :profile_assets, :public_uid
  end
end
