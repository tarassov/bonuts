# frozen_string_literal: true

class AddAcitveToUsers < ActiveRecord::Migration::Current
  def change
    add_column :users, :active, :boolean
  end
end
