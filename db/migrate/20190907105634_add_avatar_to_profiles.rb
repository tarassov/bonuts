# frozen_string_literal: true

class AddAvatarToProfiles < ActiveRecord::Migration::Current
  def change
    add_column :profiles, :avatar, :string
  end
end
