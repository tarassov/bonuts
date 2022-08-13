# frozen_string_literal: true

module SpecSchemas
  class Invitation
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
  end
end
