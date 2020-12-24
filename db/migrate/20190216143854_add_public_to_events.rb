# frozen_string_literal: true

class AddPublicToEvents < ActiveRecord::Migration::Current
  def change
    add_column :events, :public, :boolean
  end
end
