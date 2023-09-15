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
          created_at
          created_at_utc
        ],
        "properties": {
          "id": { "type": 'number' },
          "amount": { "type": '' },
          "parent_operation_id": { "anyOf": [
            { type: :number, nullable: true },
            { type: 'null' }
          ] },
          "direction": { "type": 'number' },
          "comment": { "anyOf": [
            { type: :string, nullable: true },
            { type: 'null' }
          ] },
          "deal_id": { "type": 'number' },
          "created_at": { "type": 'string' },
          "created_at_utc": { type: 'string' },
          "updated_at": { "type": 'string' }
        }
      }
    end
  end
end
