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
          }
        }
      }
    end

    def self.schema
      {
        "type": 'object',

        "properties": {
          "id": { "type": 'string' },
          "type": { "type": 'string' },
          "attributes": SpecSchemas::Profile.profile_attributes
        }
      }
    end

    def self.profile_attributes
      {
        "type": 'object',
        "properties": {
          id: { type: 'number' },
          user_id: { type: 'number' },
          active: { type: 'boolean' },
          admin: { type: 'boolean' },
          attached: { type: 'boolean' },
          roles: { type: 'array', items: { type: 'string' } },
          "default": {
            "type": 'boolean'
          },
          "department": {
            "anyOf": [
              { type: :object, nullable: true, "required": [] },
              { type: 'null' }
            ]
          },
          "position": {
            "anyOf": [
              { type: :string, nullable: true },
              { type: 'null' }
            ]
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
          "name": {
            "type": 'string'
          },
          "email": {
            "type": 'string'
          },
          "tenant": {
            "type": 'string'
          },
          "sex": {
            "type": 'string'
          },
          "phone": {
            "anyOf": [
              { type: :string, nullable: true },
              { type: 'null' }
            ]
          },
          "bio": {
            "anyOf": [
              { type: :string, nullable: true },
              { type: 'null' }
            ]
          },
          "birthdate": {
            "anyOf": [
              { type: :date, nullable: true },
              { type: 'null' }
            ]
          },
          "in_date": {
            "anyOf": [
              { type: :date, nullable: true },
              { type: 'null' }
            ]
          },
          created_at: { type: 'string' },
          "user_avatar": SpecSchemas::User.avatar,
          "circles": {
            "type": 'array',
            "items": SpecSchemas::Circle.schema
          },
          "logo": {
            "type": 'object',
            "properties": {
              "url": {
                "type": 'string',
                nullable: true
              },
              "thumb": {
                "type": 'object',

                "properties": {
                  "url": {
                    "type": 'string',
                    nullable: true
                  }
                }
              }
            }
          },
          "score_total": {
            "type": 'integer'
          },
          "self_account": {
            "type": 'object',
            "properties": {
              "id": {
                "type": 'integer'
              },
              "tenant_id": {
                "type": 'integer'
              },
              "profile_id": {
                "type": 'integer'
              }
            }
          },
          "distrib_account": {
            "type": 'object',
            "properties": {
              "id": {
                "type": 'integer'
              },
              "tenant_id": {
                "type": 'integer'
              },
              "profile_id": {
                "type": 'integer'
              }
            }
          }
        }
      }
    end

    def self.profile
      {
        "type": 'object',

        "properties": {
          "data": {
            "type": 'object',
            "properties": {
              "id": {
                "type": 'string'
              },
              "type": {
                "type": 'string'
              },
              "attributes": SpecSchemas::Profile.profile_attributes,
              "relationships": {
                "type": 'object',
                "properties": {
                  "user": {
                    "type": 'object',
                    "properties": {
                      "data": {
                        "type": 'object',
                        "properties": {
                          "id": {
                            "type": 'string'
                          },
                          "type": {
                            "type": 'string'
                          }
                        },
                        "required": %w[
                          id
                          type
                        ]
                      }
                    },
                    "required": [
                      'data'
                    ]
                  }
                }
              }
            }
          },
          "included": {
            "type": 'array',
            "items": {
              "type": 'object',
              "properties": {
                "id": {
                  "type": 'string'
                },
                "type": {
                  "type": 'string',
                  "enum": ['user']
                },
                "attributes": {
                  "type": 'object',
                  "properties": {
                    "id": {
                      "type": 'integer'
                    },
                    "email": {
                      "type": 'string',
                      "format": 'email'
                    },
                    "last_name": {
                      "type": 'string'
                    },
                    "first_name": {
                      "type": 'string'
                    },
                    "sex": {
                      "type": 'string'
                    },
                    "notes": {
                      "anyOf": [
                        { type: :string, nullable: true },
                        { type: 'null' }
                      ]
                    },
                    "email_confirmed": {
                      "type": 'boolean'
                    },
                    "name": {
                      "type": 'string'
                    }
                  },
                  "required": %w[id email last_name first_name sex email_confirmed name]
                }
              },
              "required": %w[id type attributes]
            }
          }
        }
      }
    end
  end
end
