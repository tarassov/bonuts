# frozen_string_literal: true

class AddCreatedAtToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :created_at, :datetime
    add_column :events, :updated_at, :datetime
  end
end
