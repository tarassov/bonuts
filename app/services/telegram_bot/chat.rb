# frozen_str
require "telegram/bot"

module TelegramBot
  attr_reader :message

  class Chat
    extend TelegramBot::ChatFactory
    attr_accessor :chat_id, :chat

    class << self
      COMMANDS = ["start"].freeze

      attr_writer :configuration

      def configuration
        @configuration ||= TelegramBot::Configuration.new
      end

      def configure
        yield(configuration)
      end

      def send_to(user_id, message)
        chat = find_chat_by_user_id(user_id)
        new(chat).run do |bot|
          bot.respond(message, configuration.token)
        end
      end

      def command?(text)
        text.start_with?("/") && COMMANDS.include?(text[1..])
      end

      def reply_to(message, secret, is_callback = false)
        return false unless configuration.secret_key == secret
        chat = find_chat(message)
        new(chat).run do |bot|
          begin
            text = message.fetch(:text, "")
            data = message.fetch(:data, nil)
            chat.present?
            if command?(text.downcase) && !is_callback
              chat.next = text[1..].downcase
              chat.next_params = {}
              chat.save
            end
            result = bot.call_command(chat, bot.chat.next, bot.chat.next_params, text, data, message.fetch(:message_id, nil))
            if result
              bot.respond(result, configuration.token)
              bot.save_next(result.next_command, result.next_params)
            end
            return true
          end
        rescue
          return false
        end
      end
    end

    def initialize(chat)
      @chat = chat
    end

    def call_command(*args)
      TelegramBot::CommandFactory.run(*args)
    end

    def save_next(next_command, next_params)
      if @chat
        @chat&.next = next_command
        @chat&.next_params = next_params
        @chat&.save
      end
    end

    def respond(result, token)
      TelegramJob.perform_later(@chat&.chat_id, result.response, token)
    end

    def run
      yield self
    end
  end
end
