module SpecSchemas
  class User
    def self.response
      {
        "type": 'object',
        "required": [],
        "properties": {
          "data": {
            "type": 'array',
            "items": {
              "type": 'object',
              "required": [],
              "properties": {
                "id": {
                  "type": 'string'
                },
                "type": {
                  "type": 'string'
                },
                "attributes": {
                }
              }
            }
          }
        }
      }
    end
  end

  def self.auth_token
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
