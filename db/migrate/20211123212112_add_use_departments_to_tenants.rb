class AddUseDepartmentsToTenants < ActiveRecord::Migration[6.0]
  def change
    add_column :tenants, :use_departmaents, :boolean
  end
end
