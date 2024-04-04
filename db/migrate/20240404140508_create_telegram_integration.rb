class CreateTelegramIntegration < ActiveRecord::Migration[7.0]
  def change
    create_table :telegram_integrations do |t|
      t.references :user, null: false, foreign_key: true
      t.string :chat_id
      t.string :username
      t.datetime :last_message

      t.timestamps
    end
  end
end
