module SpecSchemas
  class Token
    def self.response
      {
        "type": 'object',
        "properties": {
          "tenants": {
            "type": 'array',
            "items": [
              {
                "type": 'string'
              },
              {
                "type": 'string'
              }
            ]
          },
          "auth_token": {
            "type": 'string'
          }
        },
        "required": %w[
          tenants
          auth_token
        ]
      }
    end
  end
end
