# frozen_string_literal: true

class AddCreatedAtToProfileAssets < ActiveRecord::Migration::Current
  def change
    add_column :profile_assets, :created_at, :datetime
  end
end
