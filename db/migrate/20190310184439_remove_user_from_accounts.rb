# frozen_string_literal: true

class RemoveUserFromAccounts < ActiveRecord::Migration[5.2]
  def change
    remove_column :accounts, :user_id
  end
end
