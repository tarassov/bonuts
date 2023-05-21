class AddTenantToCircles < ActiveRecord::Migration[7.0]
  def change
    add_reference :circles, :tenant, null: false, foreign_key: true
  end
end
