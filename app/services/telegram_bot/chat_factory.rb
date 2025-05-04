# frozen_string_literal: true

module TelegramBot
  module ChatFactory
    def find_chat_by_user_id(user_id)
      TelegramChat.find_by({ user_id: user_id })
    end

    def find_chat(message)
      if message
        chat_id = message.dig("chat", "id")
        username = message.dig("chat", "username")
        text = message.dig("text")
        chat = TelegramChat.find_by({ chat_id: chat_id })
        chat = TelegramChat.create({ chat_id: chat_id, username:, last_message: text, next: "start", next_params: {} }) unless chat
        chat
      end
    end
  end
end
