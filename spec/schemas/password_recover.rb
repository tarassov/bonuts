# frozen_string_literal: true

module SpecSchemas
  class PasswordRecover
    class << self
      def array_response
        {
          "type": "array",
          "items": SpecSchemas::PasswordRecover.schema,
        }
      end

      def schema
        {
          "type": "object",
          "required": [
            "email_sent",
          ],
          "properties": {
            "email_sent": { "type": "boolean" },
          },
        }
      end
    end
  end
end
