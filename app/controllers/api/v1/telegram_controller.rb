# frozen_string_literal: true

module Api
  module V1
    class TelegramController < Api::V1::ApiController
      skip_before_action :authenticate_request
      def message
        AppLogger.create({ callee: self.class, method: __method__, body: params[:message], remote_ip: request.remote_ip })
        render(json: { ok: true }, status: :ok)
        # if check_telegram_token
        #   chat_id = params.dig("message", "chat", "id")
        #   text = params.dig("message", "text")
        # end
      end

      private

      def check_telegram_token
        # return false if request.headers["X-Telegram-Bot-Api-Secret-Token"].blank?
        #
        # token = request.headers["X-Telegram-Bot-Api-Secret-Token"]
        # Rails.application.secrets.telegram_secret == token
      end
    end
  end
end
