class AddDealToEvents < ActiveRecord::Migration[5.2]
  def change
    add_reference :events, :deal, foreign_key: true
  end
end
