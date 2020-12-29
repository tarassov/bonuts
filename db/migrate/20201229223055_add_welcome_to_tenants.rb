class AddWelcomeToTenants < ActiveRecord::Migration[6.0]
  def change
    add_column :tenants, :welcome_points, :integer
    add_column :tenants, :welcome_donuts, :integer
  end
end
