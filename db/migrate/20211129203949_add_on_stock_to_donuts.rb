class AddOnStockToDonuts < ActiveRecord::Migration[6.0]
  def change
    add_column :donuts, :on_stock, :integer
    add_column :donuts, :supply_days, :integer
  end
end
