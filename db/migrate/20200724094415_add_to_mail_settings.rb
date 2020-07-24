class AddToMailSettings < ActiveRecord::Migration[5.2]
  def change
    add_column :mail_settings, :enable_starttls_auto, :string
    add_column :mail_settings, :openssl_verify_mode, :string
    add_column :mail_settings, :ssl, :boolean
    add_column :mail_settings, :tls, :boolean
  end
end
