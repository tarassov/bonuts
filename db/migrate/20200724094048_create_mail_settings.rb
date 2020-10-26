class CreateMailSettings < ActiveRecord::Migration::Current
  def change
    create_table :mail_settings do |t|
      t.references :tenant, foreign_key: true
      t.string :address
      t.string :encrypted_password
      t.integer :port
      t.string :domain
      t.string :user_name
      t.string :authentication
    end
  end
end
