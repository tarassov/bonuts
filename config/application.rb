# frozen_string_literal: true

require_relative 'boot'

require 'rails'
# Pick the frameworks you want:
require 'carrierwave'
require 'carrierwave/orm/activerecord'
require 'carrierwave/processing/mini_magick'
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'action_cable/engine'
require 'sprockets/railtie'

# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Bonuts
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
    config.app_generators.scaffold_controller = :scaffold_controller

    config.middleware.use Rack::MethodOverride
    config.middleware.use ActionDispatch::Flash
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore

    config.active_job.queue_adapter = :sidekiq

    # Eager load things that will be available in production. Don't place development dependencies in this folder.
    config.eager_load_paths += %W[#{config.root}/lib]
    # Add generators, they don't have a module structure that matches their directory structure.
    # Only load development dependencies when needed in the development environment.
    if Rails.env.development?
      config.autoload_paths += Dir.glob("#{config.root}/lib_development")
      config.autoload_paths += Dir.glob("#{config.root}/lib_development/generators/*")
    end

    # config.eager_load_paths << Rails.root.join('app/commands')
    # config.eager_load_paths << Rails.root.join('app/commands/**/')
    # config.autoload_paths += %W(#{config.root}/app)
    config.autoload_paths += Dir["#{config.root}/app/commands/**/"]
    config.autoload_paths += Dir["#{config.root}/app/logic/**/"]

    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}')]
    config.i18n.default_locale = :ru

    config.session_store :cookie_store, key: '_bonuts_app_session', domain: :all, tld_length: 2
  end
end
