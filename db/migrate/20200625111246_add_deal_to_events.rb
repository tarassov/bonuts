class AddDealToEvents < ActiveRecord::Migration::Current
  def change
    add_reference :events, :deal, foreign_key: true
  end
end
