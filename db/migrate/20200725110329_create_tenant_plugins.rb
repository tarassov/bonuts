class CreateTenantPlugins < ActiveRecord::Migration::Current
  def change
    create_table :tenant_plugins do |t|
      t.references :plugin, foreign_key: true
      t.references :tenant, foreign_key: true
      t.boolean :active
    end
  end
end
