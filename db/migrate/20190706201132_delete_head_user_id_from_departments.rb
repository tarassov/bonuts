# frozen_string_literal: true

class DeleteHeadUserIdFromDepartments < ActiveRecord::Migration[5.2]
  def change
    remove_column :departments, :head_user_id
  end
end
