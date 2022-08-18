# frozen_string_literal: true

module SpecSchemas
  class User
    def self.response
      {
        "type": 'object',
        
        "properties": {
          "data": {
            "type": 'array',
            "items": {
              "type": 'object',
              
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

    def self.avatar
      {
        "type": 'object',
        "properties": {
          "url": {
            "type": 'string', "nullable": true
          },
          "thumb": {
            "type": 'object',
            "properties": {
              "url": {
                "type": 'string', "nullable": true
              }
            },
            "required": [
              'url'
            ]
          },
          "preview": {
            "type": 'object',
            "properties": {
              "url": {
                "type": 'string', "nullable": true
              }
            },
            "required": [
              'url'
            ]
          }
        },
        "required": %w[
          url
          thumb
          preview
        ]
      }
    end
  end
end
