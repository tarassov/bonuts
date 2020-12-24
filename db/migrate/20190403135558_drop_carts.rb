# frozen_string_literal: true

class DropCarts < ActiveRecord::Migration::Current
  def change
    drop_table :carts
  end
end
