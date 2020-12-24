# frozen_string_literal: true

class RemoveUserFromAccounts < ActiveRecord::Migration::Current
  def change
    remove_column :accounts, :user_id
  end
end
