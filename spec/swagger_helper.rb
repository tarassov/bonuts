# frozen_string_literal: true

require 'rails_helper'
# require "json/schema_builder"

# # this block ensures if any schema element is extra or missing, the test fails.
# JSON::SchemaBuilder.configure do |opts|
#   opts.validate_schema = true
#   opts.strict = true
# end
# # let spec know where schemas are
# Dir["./spec/schemas/*.rb"].each { |file| require file }

RSpec.configure do |config|
  # Specify a root folder where Swagger JSON files are generated
  # NOTE: If you're using the rswag-api to serve API descriptions, you'll need
  # to ensure that it's configured to serve Swagger from the same folder
  config.swagger_root = Rails.root.join('swagger').to_s

  # Define one or more Swagger documents and provide global metadata for each one
  # When you run the 'rswag:specs:swaggerize' rake task, the complete Swagger will
  # be generated at the provided relative path under swagger_root
  # By default, the operations defined in spec files are added to the first
  # document below. You can override this behavior by adding a swagger_doc tag to the
  # the root example_group in your specs, e.g. describe '...', swagger_doc: 'v2/swagger.json'
  config.swagger_docs = {
    'v1/swagger.json' => {
      openapi: '3.0.1',
      info: {
        title: 'Bonuts api',
        version: 'v1',
        description: 'Bonuts server. https://demo.bonuts.ru For this sample, you can use the api key `demotoken` to test the authorization     filters.',
        contact: {
          email: 'info@bonuts.ru'
        },
        license: {
          name: 'Apache 2.0',
          url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
      },
      # basePath: '/api/v1/',
      paths: {},
      components: {
        securitySchemes: {
          bearer_auth: {
            type: :http,
            scheme: :bearer
          }
        }
      },
      servers: [
        {
          url: '{defaultHost}/api/v1',
          variables: {
            defaultHost: {
              default: 'http://localhost:3000',
              enum: %w[http://localhost:3000 https://api.bonuts.ru]
            }
          }
        }
      ]
    }
  }

  # Specify the format of the output Swagger file when running 'rswag:specs:swaggerize'.
  # The swagger_docs configuration option has the filename including format in
  # the key, this may want to be changed to avoid putting yaml in json files.
  # Defaults to json. Accepts ':json' and ':yaml'.
  config.swagger_format = :json

  Dir['./spec/schemas/*.rb'].sort.each { |file| require file }
end
