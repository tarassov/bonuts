module SpecSchemas 

    class User
      def self.response
        return {
          "type": "object",
          "required": [],
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [],
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "type": {
                    "type": "string"
                  },
                  "attributes": {
                  }
                }
            }
        }
    }