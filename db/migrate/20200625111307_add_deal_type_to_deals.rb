class AddDealTypeToDeals < ActiveRecord::Migration::Current
  def change
    add_column :deals, :deal_type, :string
  end
end
