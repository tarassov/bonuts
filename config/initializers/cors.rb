# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins(/bonuts\.ru\z/, /(.*?)\.bonuts\.ru\z/, /(.*?)\.bonuts\.net\z/, /localhost:\d+/)
      resource '*',
             headers: :any,

             expose: %w[per-page total Set-Cookie ETag],
             methods: %i[get post put patch delete options head],
             credentials: true
    end
    # Rule 2: Allow requests from all origins for image assets
    # allow do
    #   origins '*'  # Allow requests from all domains
    #   resource '/uploads/*',
    #            headers: :any,
    #            methods: %i[get options],
    #            credentials: false
    # end
end
