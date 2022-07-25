# frozen_string_literal: true

module SpecSchemas
  class Tenant
    def self.schema
      {
        "type": 'object',
        "required": %w[
          id
          name
          caption
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
        ],
        "properties": {
          "id": { "type": 'number' },
          "name": { "type": 'string' },
          "caption": { "type": 'string' },
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
          "join_to_project_donuts": { "type": 'number' },
          "join_to_company_donuts": { "type": 'number' },
          "use_departments": { "type": 'boolean' }
        }
      }
    end
  end
end
