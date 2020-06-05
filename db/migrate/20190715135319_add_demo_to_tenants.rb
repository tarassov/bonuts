# frozen_string_literal: true

class AddDemoToTenants < ActiveRecord::Migration[5.2]
  def change
    add_column :tenants, :demo, :boolean
  end
end
