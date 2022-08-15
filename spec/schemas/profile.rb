# frozen_string_literal: true

module SpecSchemas
  class Profile
    def self.response
      {
        "type": 'object',
        
        "properties": {
          "data": {
            "type": 'array',
            "items": SpecSchemas::Profile.schema
          },
        }
      }
    end

    def self.schema
      {
        "type": 'object',
        
        "properties": {
          "id": {"type": 'string'},
          "type": {"type": 'string'},
          "attributes": {
            "type": 'object',            
            "properties": {
              id: {type: 'number'},
              active: {type: 'boolean'},
              admin: {type: 'boolean'},
              attached: {type: 'boolean'},
              roles: {type: 'array', items: {type: 'string'}},
              "default": {
                "type": 'boolean'
              },
              "department": {
                "type": %w[object null],
                "required": []
              },
              "position": {
                "type": %w[string null]
              },
              "store_admin": {
                "type": 'boolean'
              },
              "first_name": {
                "type": 'string'
              },
              "last_name": {
                "type": 'string'
              },
              "email": {
                "type": 'string'
              },
              "sex": {
                "type": 'string'
              },
              "name": {
                "type": 'string'
              },
              created_at: {type: 'string'},
              "user_avatar": SpecSchemas::User.avatar,
              "logo": {
                "type": 'object',
                "properties": {
                  "url": {
                    "type": %w[string null]
                  },
                  "thumb": {
                    "type": 'object',
                    
                    "properties": {
                      "url": {
                        "type": %w[string null]
                      }
                    }
                  }
                }
              },
              "score_total": {
                "type": 'integer'
              }
            }
          },
        }
      }
    end
  end
end
