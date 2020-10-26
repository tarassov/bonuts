# frozen_string_literal: true

class AddDemoToUsers < ActiveRecord::Migration::Current
  def change
    add_column :users, :demo, :boolean
  end
end
