# frozen_string_literal: true

class CreateTenants < ActiveRecord::Migration::Current
  def change
    create_table :tenants do |t|
      t.string :name
    end
  end
end
