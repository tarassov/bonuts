# frozen_string_literal: true

class AddStatusToProfileAssets < ActiveRecord::Migration::Current
  def change
    add_column :profile_assets, :status, :integer
  end
end
