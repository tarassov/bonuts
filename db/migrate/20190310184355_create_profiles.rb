# frozen_string_literal: true

class CreateProfiles < ActiveRecord::Migration::Current
  def change
    create_table :profiles do |t|
      t.boolean :admin
      t.references :tenant, foreign_key: true
      t.boolean :default
      t.references :user, foreign_key: true
    end
  end
end
