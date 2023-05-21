class ChangeProfileColumnTypes < ActiveRecord::Migration[7.0]
  def change
    change_column :profiles, :birthdate, 'date USING CAST(birthdate AS date)'
    change_column :profiles, :in_date, 'date USING CAST(in_date AS date)'
  end
end
