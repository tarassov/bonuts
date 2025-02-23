Rails.application.config.to_prepare do
  TelegramBot::Chat.configure do |config|
    config.secret_key = Rails.application.credentials.telegram_secret
    config.token = Rails.application.credentials.telegram_token
  end
end
