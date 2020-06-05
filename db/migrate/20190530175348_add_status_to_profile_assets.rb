# frozen_string_literal: true

class AddStatusToProfileAssets < ActiveRecord::Migration[5.2]
  def change
    add_column :profile_assets, :status, :integer
  end
end
