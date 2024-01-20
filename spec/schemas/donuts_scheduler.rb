# frozen_string_literal: true

module SpecSchemas
  class Scheduler
    def self.schema
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
          "attributes": SpecSchemas::Scheduler.scheduler_attributes
        }
      }
    end

    def self.scheduler
      {
        "type": 'object',

        "properties": {
          "data": SpecSchemas::Scheduler.schema
        }
      }
    end

    def self.scheduler_attributes
      {
        "type": 'object',
        "required": %w[
          id
          name
          active
        ],
        "properties": {
          "name": {
            "type": 'string', "nullable": true
          },
          "comment": {
            "type": 'string', "nullable": true
          },
          "id": { "type": 'number' },
          "active": { "type": 'boolean' },
          "day": { "type": 'number', "nullable": true },
          "weekday": { "type": 'number', "nullable": true },
          "burn_old": { "type": 'boolean', "nullable": true },
          "every": { "type": 'string' },
          "execute_time": { "type": 'string', "nullable": true },
          "time_in_seconds": { "type": 'number', "nullable": true },
          "timezone": { "type": 'string', "nullable": true },
          "profile": SpecSchemas::Profile.profile_attributes
        }
      }
    end

    def self.array
      {
        "type": 'object',

        "properties": {
          "data": {
            "type": 'array',
            "items": SpecSchemas::Scheduler.schema
          }
        }
      }
    end
  end
end
