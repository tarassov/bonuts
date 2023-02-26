# frozen_string_literal: true

module SpecSchemas
  class Tenant
    def self.schema
      {
        "type": %w[object null],
        "nullable": true,
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
          "demo": { "type": 'boolean' },
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
  end
end
