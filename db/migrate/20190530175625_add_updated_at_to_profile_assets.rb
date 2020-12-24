# frozen_string_literal: true

class AddUpdatedAtToProfileAssets < ActiveRecord::Migration::Current
  def change
    add_column :profile_assets, :updated_at, :datetime
  end
end
