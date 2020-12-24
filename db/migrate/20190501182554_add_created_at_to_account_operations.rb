# frozen_string_literal: true

class AddCreatedAtToAccountOperations < ActiveRecord::Migration::Current
  def change
    add_column :account_operations, :created_at, :datetime
    add_column :account_operations, :updated_at, :datetime
  end
end
