# frozen_string_literal: true

class CreateDepartments < ActiveRecord::Migration[5.2]
  def change
    create_table :departments do |t|
      t.string :name
      t.string :location
      t.bigint :head_user_id
    end

    add_foreign_key :departments, :users, column: :head_user_id
  end
end
