# frozen_string_literal: true

class AddDemoToTenants < ActiveRecord::Migration::Current
  def change
    add_column :tenants, :demo, :boolean
  end
end
