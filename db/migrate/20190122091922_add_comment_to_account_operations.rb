# frozen_string_literal: true

class AddCommentToAccountOperations < ActiveRecord::Migration::Current
  def change
    add_column :account_operations, :comment, :string
  end
end
