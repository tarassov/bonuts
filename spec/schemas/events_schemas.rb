module SpecSchemas
    class Events
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
                        "content": {type:'string'},
                        "id": {type:'integer'},
                        "date_string": {type:'string'},
                        "user_id": {type:'integer'},
                        "user_name": {type:'string'},
                        "comment_count": {type:'integer'},
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
  