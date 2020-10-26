# frozen_string_literal: true

class RemoveStringFromEvents < ActiveRecord::Migration::Current
  def change
    remove_column :events, :string
  end
end
