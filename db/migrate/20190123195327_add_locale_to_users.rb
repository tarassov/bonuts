# frozen_string_literal: true

class AddLocaleToUsers < ActiveRecord::Migration::Current
  def change
    add_column :users, :locale, :string
  end
end
