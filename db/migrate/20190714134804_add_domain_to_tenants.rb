class AddDomainToTenants < ActiveRecord::Migration[5.2]
  def change
    add_column :tenants, :domain, :string
  end
end
