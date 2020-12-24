# frozen_string_literal: true

class AddProfileToAccounts < ActiveRecord::Migration::Current
  def change
    add_reference :accounts, :profile, foreign_key: true
  end
end
