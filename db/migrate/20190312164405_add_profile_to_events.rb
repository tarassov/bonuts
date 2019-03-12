class AddProfileToEvents < ActiveRecord::Migration[5.2]
  def change
    add_reference :events, :profile, foreign_key: true
  end
end
