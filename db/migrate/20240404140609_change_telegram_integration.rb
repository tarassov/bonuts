class ChangeTelegramIntegration < ActiveRecord::Migration[7.0]
  def change
    add_index(:telegram_integrations, :chat_id, name: "index_tg_chat_id")
  end
end
