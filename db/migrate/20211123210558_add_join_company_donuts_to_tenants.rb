class AddJoinCompanyDonutsToTenants < ActiveRecord::Migration[6.0]
  def change
    add_column :tenants, :join_to_company_donuts, :boolean
  end
end
