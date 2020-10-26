# frozen_string_literal: true

class AddEmailConfirmColumnToUsers < ActiveRecord::Migration::Current
  def change
    add_column :users, :email_confirmed, :boolean
    add_column :users, :confirm_token, :string
  end
end
