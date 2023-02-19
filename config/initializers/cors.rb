# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # dynamically check domains https://github.com/cyu/rack-cors/issues/50#issuecomment-172674220
    # if Rails.env.development?
    origins 'localhost:3000', 'localhost:3001', /(.*?)\.bonuts\.ru/
    # else
    #   origins(%r{http://(.*?)\.bonuts\.ru})
    # end

    resource '*',
             headers: :any,

             expose: %w[per-page total Set-Cookie ETag],
             methods: %i[get post put patch delete options head],
             credentials: true
  end
end
