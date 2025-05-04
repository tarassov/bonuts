# frozen_string_literal: true

module Api
  class TelegramController < Api::V1::ApiController
    skip_before_action :authenticate_request

    def message
      token = request.headers["X-Telegram-Bot-Api-Secret-Token"]
      AppLogger.create({ callee: self.class, method: __method__, body: params.merge({ token: token }).merge(headers), remote_ip: request.remote_ip })
      callback = params.fetch(:callback_query, nil)
      result = if callback
                 TelegramBot::Chat.reply_to(callback[:message].merge({ data: callback[:data] }), token, true)
               else
                 TelegramBot::Chat.reply_to(params[:message], token, false)
               end
      render(json: { ok: result }, status: :ok)
    end
  end
end
