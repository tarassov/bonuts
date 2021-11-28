class AddLogoToDonuts < ActiveRecord::Migration[6.0]
  def change
    add_column :donuts, :logo, :string
    add_column :donuts, :description, :string
  end
end
