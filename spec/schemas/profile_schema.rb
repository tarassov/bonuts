module SpecSchemas 

    class ProfileCreateRequest
      include JSON::SchemaBuilder
      def schema
        object do
          object :article do
            string :title, required: true
            string :body, required: true
          end
        end
      end
    end
  
    class ProfileResponse
      include JSON::SchemaBuilder
  
      def schema
        object do
          number :id, required: true
          string :title, required: true
          string :body, required: true
        end
      end
    end
  end