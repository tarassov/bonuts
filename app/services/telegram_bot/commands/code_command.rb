# frozen_string_literal: true

module TelegramBot
  module Commands
    class CodeCommand < BaseCommand
      def run
        user = User.find_by_email(@text)
        if user
          TelegramBot::CommandResult.new("validate", { user_id: user.id, email: @text }, text: I18n.t("telegram.tell_me_your_secret_code"), reply_markup: {})
        else
          TelegramBot::CommandResult.new("code", {}, text: I18n.t("telegram.email_not_found"), reply_markup: {})
        end
      end
    end
  end
end
# frozen_string_literal: true
