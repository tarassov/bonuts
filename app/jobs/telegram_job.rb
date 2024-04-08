# frozen_string_literal: true

class TelegramJob < ApplicationJob
  # Set the Queue as Default
  queue_as :default
  def perform(chat_id, response, token)
    # reply_markup = Telegram::Bot::Types::ReplyKeyboardMarkup.new(response[:reply_markup]) if response[:reply_markup].present?
    Telegram::Bot::Client.run(token) do |bot|
      # bot.api.send_message(chat_id:  chat_id, text: response[:text], reply_markup: reply_markup || {}) unless Rails.env.development?
      if response[:reply_markup]
        keyboard = response[:reply_markup][:keyboard]
        edit = response[:reply_markup][:edit]
        if keyboard
          kb = response[:reply_markup][:keyboard].map do |k|
            k.map { |key| Telegram::Bot::Types::InlineKeyboardButton.new(text: key[:text], callback_data: key[:text]) }
          end
          markup = Telegram::Bot::Types::InlineKeyboardMarkup.new(inline_keyboard: kb)
          bot.api.send_message(chat_id: chat_id, text: response[:text], reply_markup: markup) unless Rails.env.development?
        else
          bot.api.send_message(chat_id: chat_id, text: response[:text]) unless Rails.env.development?
        end
        if edit
          bot.api.edit_message_text(chat_id: chat_id, message_id: edit[:message_id], text: edit[:text]) unless Rails.env.development?
        end
      else
        bot.api.send_message(chat_id: chat_id, text: response[:text]) unless Rails.env.development?
      end
    end
  end
end
