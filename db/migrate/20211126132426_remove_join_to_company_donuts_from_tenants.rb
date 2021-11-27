class RemoveJoinToCompanyDonutsFromTenants < ActiveRecord::Migration[6.0]
  def change
    remove_column :tenants, :join_to_project_donuts
    add_column :tenants, :join_to_project_donuts, :integer

    remove_column :tenants, :join_to_company_donuts
    add_column :tenants, :join_to_company_donuts, :integer

    remove_column :tenants, :use_departmaents
    add_column :tenants, :use_departments, :boolean
  end
end
