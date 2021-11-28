class AddBirthdayDonutsToTenants < ActiveRecord::Migration[6.0]
  def change
    add_column :tenants, :birthday_donuts, :boolean
  end
end
