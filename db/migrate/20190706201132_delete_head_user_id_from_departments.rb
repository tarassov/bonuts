# frozen_string_literal: true

class DeleteHeadUserIdFromDepartments < ActiveRecord::Migration::Current
  def change
    remove_column :departments, :head_user_id
  end
end
