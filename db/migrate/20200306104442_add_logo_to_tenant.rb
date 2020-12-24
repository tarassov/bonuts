# frozen_string_literal: true

class AddLogoToTenant < ActiveRecord::Migration::Current
  def change
    add_column :tenants, :logo, :string
  end
end
