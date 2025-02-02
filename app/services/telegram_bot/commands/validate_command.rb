# frozen_string_literal: true

module TelegramBot
  module Commands
    class ValidateCommand < BaseCommand
      def run
        user_id = @args.dig("user_id")
        user = User.find(user_id)
        if user && @text == "000"
          @chat.user_id = user_id
          @chat.save
          TelegramBot::CommandResult.new("", {}, text: "All done", reply_markup: {})
        else
          TelegramBot::CommandResult.new("validate", @args, text: "try again", reply_markup: {})
        end
      end
    end
  end
end

