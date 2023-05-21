class CreateJoinTableCirclesProfiles < ActiveRecord::Migration[7.0]
  def change
    create_join_table :profiles, :circles
  end
end
