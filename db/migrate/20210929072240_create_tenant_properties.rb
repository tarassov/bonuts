class CreateTenantProperties < ActiveRecord::Migration[6.0]
  def change
    create_table :tenant_properties do |t|
      t.string :name
      t.string :notes

      t.timestamps
    end
  end
end
