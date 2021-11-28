class RemoveBirthdayDonutsFromTenants < ActiveRecord::Migration[6.0]
  def change
    remove_column :tenants, :birthday_donuts
    add_column :tenants, :birthday_donuts, :integer
  end
end
