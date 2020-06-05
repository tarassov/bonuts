# frozen_string_literal: true

class AddLogoToTenant < ActiveRecord::Migration[5.2]
  def change
    add_column :tenants, :logo, :string
  end
end
