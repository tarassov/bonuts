# frozen_string_literal: true

class AddDepartmentToProfile < ActiveRecord::Migration::Current
  def change
    add_reference :profiles, :department, foreign_key: true
  end
end
