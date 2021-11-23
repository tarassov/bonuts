class AddEmailNotificationToTenants < ActiveRecord::Migration[6.0]
  def change
    add_column :tenants, :email_notification, :boolean
  end
end
