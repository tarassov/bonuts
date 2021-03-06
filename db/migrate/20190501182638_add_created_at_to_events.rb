# frozen_string_literal: true

class AddCreatedAtToEvents < ActiveRecord::Migration::Current
  def change
    add_column :events, :created_at, :datetime
    add_column :events, :updated_at, :datetime
  end
end
