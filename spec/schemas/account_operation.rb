# frozen_string_literal: true

module SpecSchemas
  class AccountOperation
    def self.schema
      {
        "type": 'object',
        "required": %w[
          id
          amount
          direction
          account_id
        ],
        "properties": {
          "id": { "type": 'number' },
          "amount": { "type": '' },
          "direction": { "type": 'number' },
          "parent_operation_id": { "type": 'number' },
          "account_id": { "type": 'number' },
          "direction": { "type": 'number' },
          "comment": { "type": 'string' },
          "deal_id": { "type": 'number' },
          "created_at": { "type": 'string' },
          "created_at_utc": { type: 'number' },
          "updated_at": { "type": 'string' }
        }
      }
    end
  end
end
