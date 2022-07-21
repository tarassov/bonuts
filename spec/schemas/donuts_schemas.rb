module SpecSchemas
    class Donuts
      def self.response
        {
          "type": 'object',
          "required": [],
          "properties": {
            "data": {
              "type": 'array',
              "items": {
                "type": 'object',
                "required": [],
                "properties": {
                  "id": {
                    "type": 'string'
                  },
                  "type": {
                    "type": 'string'
                  },
                  "attributes": {
                    "active": 'boolean',
                    "name": 'string'
                  }
                }
              }
            }
          }
        }
      end
    end 
  end
  