class AddJoinProjectDonutsToTenants < ActiveRecord::Migration[6.0]
  def change
    add_column :tenants, :join_to_project_donuts, :boolean
  end
end
