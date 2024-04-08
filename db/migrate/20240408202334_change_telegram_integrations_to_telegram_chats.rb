class ChangeTelegramIntegrationsToTelegramChats < ActiveRecord::Migration[7.0]
  def change
    rename_table(:telegram_integrations, :telegram_chats)
  end
end
