# frozen_string_literal: true

module SpecSchemas
  class PasswordRecover
    def self.request_sent
      {
        "type": 'object',
        "required": %w[
          email_sent
        ],
        "properties": {
          "email_sent": { "type": 'boolean' }
        }
      }
    end
  end
end
