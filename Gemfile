# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.2'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'

gem 'rails', '7.1.3.4'

gem 'sprockets-rails'

# Use postgresql as the database for Active Record
gem 'pg'

# Use Puma as the app server
gem 'puma', '~> 5.6.4'
# Use ActiveStorage variant
gem 'mini_magick'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors'

# gem 'rswag'
gem 'bcrypt'
gem 'cancancan'
gem 'carrierwave'
gem 'draper'
gem 'jwt'

# kaminari + api-pagination for pagination
gem 'api-pagination'
gem 'kaminari'

gem 'rspec-core'
gem 'rswag-api'
gem 'rswag-ui'

gem 'active_model_serializers'
gem 'jsonapi-serializer'
# integrations
gem 'mattermost-api4-ruby', '0.0.13', git: 'https://github.com/tarassov/mattermost-api4-ruby.git', branch: '0.0.12'
gem 'telegram-bot-ruby', '~> 1.0'

gem 'pry'
gem 'public_uid'
gem 'rails-i18n'
gem 'sidekiq'
gem 'simple_command'
# cron task scheduler
gem 'whenever'
# mail sender via unisender api
gem 'unigo-sender-simple', '~> 0.0.13'

# dry-rb
gem 'dry-validation', '1.10.0'

group :development, :test do
  gem 'bcrypt_pbkdf', '>= 1.0', '< 2.0'

  gem 'capistrano', require: false
  gem 'capistrano3-puma', '5.2.0'
  gem 'capistrano-bundler'
  gem 'capistrano-npm'
  gem 'capistrano-rails', require: false
  gem 'capistrano-rvm'

  gem 'ed25519', '>= 1.2', '< 2.0'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'sshkit-sudo'

  gem 'debug', '1.9.1', platforms: %i[mri mswin mswin64 mingw x64_mingw]

  gem 'rubocop', '1.63.0', require: false
  gem 'rubocop-faker'
  gem 'rubocop-performance', '1.20.2', require: false
  gem 'rubocop-rails', '2.21.2', require: false
  gem 'rubocop-rspec', '2.26.1', require: false

  gem 'rspec-json_expectations'
  gem 'rspec-rails', '6.1.1'
  gem 'rswag-specs', '2.16.0'

  gem 'json-schema'
  gem 'shoulda-matchers', '~> 3.1'

end

group :development do
  gem 'simplecov', require: false, group: :test
  gem 'web-console'
end

group :test do
  gem 'database_cleaner'
  gem 'factory_bot_rails'
  gem 'faker', '>= 1.9.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
