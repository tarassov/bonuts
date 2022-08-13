module SpecSchemas
  class Authorization
    def self.response
      {
        "type": 'object',
        "properties": {
          "tenants": {
            "type": 'array',
            "items": SpecSchemas::Tenant.schema
          },
          "auth_token": { "type": 'string' },
          "current_tenant": SpecSchemas::Tenant.schema
        },
        "required": %w[
          tenants
          auth_token
        ]
      }
    end

    def self.failure
      {
        "type": 'object',
        "required": %w[
          error
          message
          errorText
          errorCode
          errorParams
        ],
        "properties": {
          "error": {
            "type": 'boolean'
          },
          "message": {
            "type": 'string'
          },
          "errorText": {
            "type": 'string'
          },
          "errorCode": {
            "type": 'number'
          },
          "errorParams": {
            "type": 'object',
            
            "properties": {}
          }
        }
      }
    end
  end
end
