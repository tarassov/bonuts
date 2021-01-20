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
  
    class ProfilesResponse
      include JSON::SchemaBuilder
  
      def schema
        object do
          array :data do
            attributes: object do
              boolean: active
              boolean: admin
              boolean: default
              department: object do
                number: id
                string: name

              end
            end
          end  
        end
      end
    end
  end