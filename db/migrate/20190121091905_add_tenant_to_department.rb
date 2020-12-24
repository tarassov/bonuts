# frozen_string_literal: true

class AddTenantToDepartment < ActiveRecord::Migration::Current
  def change
    add_reference :departments, :tenant, foreign_key: true
  end
end
