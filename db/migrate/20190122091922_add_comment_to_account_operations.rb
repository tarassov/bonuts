# frozen_string_literal: true

class AddCommentToAccountOperations < ActiveRecord::Migration[5.2]
  def change
    add_column :account_operations, :comment, :string
  end
end
