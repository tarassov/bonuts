class AddTestToTenants < ActiveRecord::Migration[5.2]
  def change
    add_column :tenants, :test, :boolean
    add_column :tenants, :caption, :string
    add_column :tenants, :acitve, :boolean
    add_column :tenants, :created_at, :datetime
    add_column :tenants, :updated_at, :datetime
  end
end