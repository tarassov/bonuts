# frozen_string_literal: true

class CreateTenants < ActiveRecord::Migration[5.2]
  def change
    create_table :tenants do |t|
      t.string :name
    end
  end
end
