class AddTenantToDepartment < ActiveRecord::Migration[5.2]
  def change
    add_reference :departments, :tenant, foreign_key: true
  end
end
