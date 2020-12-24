# frozen_string_literal: true

class AddDomainToTenants < ActiveRecord::Migration::Current
  def change
    add_column :tenants, :domain, :string
  end
end
