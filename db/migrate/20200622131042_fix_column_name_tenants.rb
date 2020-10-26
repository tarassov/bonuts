class FixColumnNameTenants < ActiveRecord::Migration::Current
  def change
    rename_column :tenants, :acitve, :active
  end
end
