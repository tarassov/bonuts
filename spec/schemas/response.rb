# frozen_string_literal: true

module SpecSchemas
    class Response
      def self.response(schema)
        {
            "type": 'object',            
            "properties": {
              "error": { "type": 'boolean' },
              "message": { "type": 'string' },
              "errorText": { "type": 'string' },
              "result": schema
            }
          }
      end  
      def self.array_response (schema)
        {
            "type": 'object',            
            "properties": {
              "error": { "type": 'boolean' },
              "message": { "type": 'string' },
              "errorText": { "type": 'string' },
              "result": {
                "type": 'array',
                "items": schema
              }
            }
          }
      end     
      
      def self.response_object(schema)
        {
          "type": 'object',
          
          "properties": {
            "data": schema
          }
        }
      end
   
    end
  end
  