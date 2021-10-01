class CreateTenantSettings < ActiveRecord::Migration[6.0]
  def change
    create_table :tenant_settings do |t|
      t.references :tenant, null: false, foreign_key: true
      t.references :tenant_property, null: false, foreign_key: true
      t.string :value

      t.timestamps
    end
  end
end
