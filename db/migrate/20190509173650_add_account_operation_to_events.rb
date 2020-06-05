# frozen_string_literal: true

class AddAccountOperationToEvents < ActiveRecord::Migration[5.2]
  def change
    add_reference :events, :account_operation, foreign_key: true
  end
end
