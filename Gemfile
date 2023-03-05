# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.2'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 7.0.3'

gem 'sprockets-rails'

# Use postgresql as the database for Active Record
gem 'pg'

# Use Puma as the app server
gem 'puma'
# Use ActiveStorage variant
gem 'mini_magick', '~> 4.12'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors'

gem 'foreman', '>= 0.84'
# gem 'rswag'
gem 'bcrypt'
gem 'cancancan'
gem 'carrierwave',  '~> 2.2'
gem 'draper'
gem 'jwt'
gem 'kaminari'
gem 'rspec-core'
gem 'rswag-api'
gem 'rswag-ui'
# gem 'pundit'
gem 'api-pagination'
gem 'jsonapi-serializer'
gem 'mattermost-api4-ruby', git: 'https://github.com/tarassov/mattermost-api4-ruby.git'
gem 'pry'
gem 'public_uid'
gem 'rails-i18n'
gem 'rest-client'
gem 'sidekiq'
gem 'simple_command'
gem 'whenever'

group :development, :test do
  gem 'bcrypt_pbkdf', '>= 1.0', '< 2.0'
  gem 'capistrano', require: false
  gem 'capistrano3-puma', require: false
  gem 'capistrano-bundler'
  gem 'capistrano-npm'
  gem 'capistrano-rails', require: false
  gem 'capistrano-rvm'
  gem 'debug', '>= 1.0.0'
  gem 'ed25519', '>= 1.2', '< 2.0'
  gem 'factory_bot_rails'
  gem 'json-schema_builder'
  gem 'rspec-json_expectations'
  gem 'rspec-rails'
  gem 'rswag-specs'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'sshkit-sudo'
end

group :development do
  gem 'rubocop', require: false
  gem 'rubocop-rails'
  gem 'simplecov', require: false, group: :test
  gem 'web-console'
end
group :test do
  gem 'database_cleaner'
  gem 'faker', '>= 1.9.0'
  gem 'rubocop-faker'
  gem 'shoulda-matchers', '~> 3.1'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
