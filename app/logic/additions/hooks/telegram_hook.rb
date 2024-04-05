# frozen_string_literal: true

class TelegramHook
  class << self
    def call
      Rails.application.secrets.telegram_token
      Telegram::Bot::Client.run(token, url: "https://proxy.example.com") do |bot|
        # ...
      end
    end
  end
end
