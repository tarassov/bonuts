# frozen_string_literal: true

class JsonWebToken
  class << self
    def encode(payload, exp = 24.days.from_now)
      payload[:exp] = exp.to_i
      JWT.encode(payload, Rails.application.credentials.secret_key_base)
    end

    def decode(token)
      body = JWT.decode(jwt = token, key = Rails.application.credentials.secret_key_base, verify = true,
                        custom_options = { algorithm: 'HS256' })[0]
      HashWithIndifferentAccess.new body
    rescue StandardError
      nil
    end
  end
end
