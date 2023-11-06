class AddBirthdayMessageToTenants < ActiveRecord::Migration[7.0]
  def change
    add_column :tenants, :birthday_message, :string
  end
end
