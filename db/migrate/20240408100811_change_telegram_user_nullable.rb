class ChangeTelegramUserNullable < ActiveRecord::Migration[7.0]
  def change
    change_column(:telegram_integrations, :user_id, :bigint, null: true)
  end
end
