module SpecSchemas 

    class User
      def self.response
        return {
          "type": "object",
          "required": [],
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [],
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "type": {
                    "type": "string"
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
      return{
        "type": "object",
        "properties": {
          "tenants": {
            "type": "array",
            "items": [
              {
                "type": "string"
              },
              {
                "type": "string"
              }
            ]
          },
          "auth_token": {
            "type": "string"
          }
        },
        "required": [
          "tenants",
          "auth_token"
        ]
      }
    end
end