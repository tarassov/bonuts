class AddIndexToDealsType < ActiveRecord::Migration[7.0]
  def change
    add_index(:deals, :deal_type, name: "index_deals_on_deal_type")
  end
end
