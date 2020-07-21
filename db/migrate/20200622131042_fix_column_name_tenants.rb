class FixColumnNameTenants < ActiveRecord::Migration[5.2]
  def change
    rename_column :tenants, :acitve, :active
  end
end
