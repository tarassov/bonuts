module SpecSchemas
  class Invitation
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
                }
              }
            }
          }
        }
      }
    end
  end 
end
