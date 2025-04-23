# frozen_string_literal: true
module TelegramBot
  class CommandFactory
    class << self
      def run(chat, name, args, text, data = nil, message_id = nil)
        # TODO: check if text is a new command
        if name.present?
          command = "TelegramBot::Commands::#{name.upcase_first}Command".constantize
          command.run(chat, args, text, data, message_id)
        end
      end
    end
  end
end
