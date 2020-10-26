# frozen_string_literal: true

class AddAvatarToUsers < ActiveRecord::Migration::Current
  def change
    add_column :users, :avatar, :string
  end
end
