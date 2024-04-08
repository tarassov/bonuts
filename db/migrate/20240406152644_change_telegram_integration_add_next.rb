class ChangeTelegramIntegrationAddNext < ActiveRecord::Migration[7.0]
  def change
    add_column(:telegram_integrations, :next, :string)
    add_column(:telegram_integrations, :next_params, :jsonb)
  end
end
