class AddDealTypeToDeals < ActiveRecord::Migration[5.2]
  def change
    add_column :deals, :deal_type, :string
  end
end
