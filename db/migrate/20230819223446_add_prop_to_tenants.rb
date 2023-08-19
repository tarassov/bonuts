class AddPropToTenants < ActiveRecord::Migration[7.0]
  def change
    add_column :tenants, :birthday_points, :integer
    add_column :tenants, :join_to_company_points, :integer
    add_column :tenants, :join_to_project_points, :integer
  end
end
