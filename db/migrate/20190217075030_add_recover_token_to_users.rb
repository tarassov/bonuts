# frozen_string_literal: true

class AddRecoverTokenToUsers < ActiveRecord::Migration::Current
  def change
    add_column :users, :recover_token, :string
  end
end
