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
          "parent_operation_id": { "anyOf": [
            { type: :number, nullable: true },
            { type: 'null' }
          ] },
          "account_id": { "type": 'number' },
          "direction": { "type": 'number' },
          "comment": { "anyOf": [
            { type: :string, nullable: true },
            { type: 'null' }
          ] },
          "deal_id": { "type": 'number' },
          "created_at": { "type": 'string' },
          "created_at_utc": { type: 'number' },
          "updated_at": { "type": 'string' }
        }
      }
    end
  end
end
