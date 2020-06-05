# frozen_string_literal: true

class AddDepartmentToProfile < ActiveRecord::Migration[5.2]
  def change
    add_reference :profiles, :department, foreign_key: true
  end
end
