# frozen_string_literal: true

module SpecSchemas
  # rubocop:disable Metrics/ClassLength
  class Tenant
    def self.response
      {
        "type": 'object',
        "properties": {
          "data": SpecSchemas::Tenant.tenant
        }
      }
    end

    def self.array_response
      {
        "type": 'object',

        "properties": {
          "data": {
            "type": 'array',
            "items": SpecSchemas::Tenant.tenant
          }
        }
      }
    end

    def self.tenant
      {
        "type": 'object',
        "required": %w[
          id
          type
          attributes
        ],
        "properties": {
          "id": { "type": 'string' },
          "type": { "type": 'string' },
          "attributes": SpecSchemas::Tenant.schema
        }
      }
    end

    def self.schema
      {
        "type": 'object',
        "required": %w[
          id
          name
          active
          created_at
          updated_at
          domain
          demo
          logo
          welcome_points
          welcome_donuts
          email_notification
          birthday_donuts
          join_to_project_donuts
          join_to_company_donuts
          use_departments
          birthday_points
          join_to_project_points
          join_to_company_points
        ],
        "properties": {
          "id": { "type": 'number' },
          "name": { "type": 'string' },
          "caption": { "type": 'string', "nullable": true },
          "active": { "type": 'boolean' },
          "created_at": { "type": 'string' },
          "updated_at": { "type": 'string' },
          "domain": { "type": 'string' },
          "birthday_message": { "type": 'string' },
          "demo": { "type": 'boolean' },
          "attached": { "type": 'boolean', "nullable": true },
          "deactivated": { "type": 'boolean', "nullable": true },
          "logo": {
            "type": 'object',
            "required": %w[
              url
              thumb
            ],
            "properties": {
              "url": {
                "type": 'string'
              },
              "thumb": {
                "type": 'object',
                "required": [
                  'url'
                ],
                "properties": {
                  "url": {
                    "type": 'string'
                  }
                }
              }
            }
          },
          "welcome_points": { "type": 'number' },
          "welcome_donuts": { "type": 'number' },
          "email_notification": { "type": 'boolean' },
          "birthday_donuts": { "type": 'number' },
          "birthday_points": { "type": 'number' },
          "join_to_project_donuts": { "type": 'number' },
          "join_to_company_donuts": { "type": 'number' },
          "join_to_project_points": { "type": 'number' },
          "join_to_company_points": { "type": 'number' },
          "use_departments": { "type": 'boolean' },
          "test": { "type": 'boolean' }
        }
      }
    end

    def self.update_schema
      {
        "type": 'object',
        "required": %w[
          id
          name
          tenant
          active
          created_at
          updated_at
          domain
          demo
          welcome_points
          welcome_donuts
          email_notification
          birthday_donuts
          join_to_project_donuts
          join_to_company_donuts
          use_departments
          birthday_points
          join_to_project_points
          join_to_company_points
        ],
        "properties": {
          "id": { "type": 'number' },
          "name": { "type": 'string' },
          "tenant": { "type": 'string' },
          "caption": { "type": 'string', "nullable": true },
          "active": { "type": 'boolean' },
          "created_at": { "type": 'string' },
          "updated_at": { "type": 'string' },
          "domain": { "type": 'string' },
          "demo": { "type": 'boolean' },
          "logo": { "type": 'file' },
          "welcome_points": { "type": 'number' },
          "welcome_donuts": { "type": 'number' },
          "email_notification": { "type": 'boolean' },
          "birthday_donuts": { "type": 'number' },
          "birthday_points": { "type": 'number' },
          "join_to_project_donuts": { "type": 'number' },
          "join_to_company_donuts": { "type": 'number' },
          "join_to_project_points": { "type": 'number' },
          "join_to_company_points": { "type": 'number' },
          "use_departments": { "type": 'boolean' },
          "test": { "type": 'boolean' }
        }
      }
    end
  end
  # rubocop:enable Metrics/ClassLength
end
