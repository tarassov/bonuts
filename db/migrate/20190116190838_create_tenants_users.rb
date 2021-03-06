# frozen_string_literal: true

class CreateTenantsUsers < ActiveRecord::Migration::Current
  def change
    create_table :tenants_users do |t|
      t.references :user, foreign_key: true
      t.references :tenant, foreign_key: true
    end
  end
end
