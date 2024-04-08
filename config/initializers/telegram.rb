Rails.application.config.to_prepare do
  TelegramBot::Chat.configure do |config|
    config.secret_key = Rails.application.secrets.telegram_secret
    config.token = Rails.application.secrets.telegram_token
  end
end
