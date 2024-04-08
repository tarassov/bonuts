# frozen_string_literal: true

module TelegramBot
  module Commands
    class EmailCommand < BaseCommand
      def run
        if @data == I18n.t("common.yes_answer") || @data.downcase == "yes"
          question = I18n.t("telegram.tell_me_your_email")
          TelegramBot::CommandResult.new("code", {}, text: question, reply_markup: { edit: { message_id: @message_id, text: @text } })
        else
          TelegramBot::CommandResult.new(
            "",
            {},
            text: I18n.t("telegram.you_can_register_your_account_here"),
            reply_markup: { edit: { message_id: @message_id } },
          )
        end
      end
    end
  end
end
