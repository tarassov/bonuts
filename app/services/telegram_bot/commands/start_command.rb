# frozen_string_literal: true

module TelegramBot
  module Commands
    class StartCommand < BaseCommand
      def run
        question = I18n.t("telegram.do_you_have_an_account")
        answers =
          {
            keyboard: [
              [{ text: I18n.t("common.yes_answer") }, { text: I18n.t("common.no_answer") }],
            ],
            one_time_keyboard: true,
          }
        TelegramBot::CommandResult.new("email", {}, text: question, reply_markup: answers)
      end
    end
  end
end
