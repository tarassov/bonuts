# frozen_string_literal: true

class AddHeadProfileIdToDepartments < ActiveRecord::Migration::Current
  def change
    add_column :departments, :head_profile_id, :bigint
    add_foreign_key :departments, :profiles, column: :head_profile_id
  end
end
