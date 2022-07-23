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
                  "id": {"type": 'string'},
                  "type": {"type": 'string'},
                  "attributes": {
                    "type": 'object',
                    "required": [],
                    "properties": {
                        "active": {type:'boolean'},
                        "name": {type:'string'},
                    }
                  }
                }
              }
            }
          }
        }
      end
    end 
  end
  