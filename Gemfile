# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.2"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", "~> 7.0.3"

gem "sprockets-rails"

# Use postgresql as the database for Active Record
gem "pg"

# Use Puma as the app server
gem "puma", "~> 5.6.4"
# Use ActiveStorage variant
gem "mini_magick", "~> 4.12"

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem "rack-cors"

# gem 'rswag'
gem "bcrypt"
gem "cancancan"
gem "carrierwave", "~> 2.2"
gem "draper"
gem "jwt"

# kaminari + api-pagination for pagination
gem "kaminari"
gem "api-pagination"

gem "rspec-core"
gem "rswag-api"
gem "rswag-ui"

gem "jsonapi-serializer"
# integrations
gem "mattermost-api4-ruby", "0.0.13", git: "https://github.com/tarassov/mattermost-api4-ruby.git", branch: "0.0.12"
gem "telegram-bot-ruby", "~> 1.0"

gem "pry"
gem "public_uid"
gem "rails-i18n"
gem "sidekiq"
gem "simple_command"
# cron task scheduler
gem "whenever"
# mail sender via unisender api
gem "unigo-sender-simple", "~> 0.0.13",git: "https://github.com/tarassov/unigo-sender-simple.git", branch: "master"

group :development, :test do
  gem "bcrypt_pbkdf", ">= 1.0", "< 2.0"
  gem "capistrano", require: false
  gem "capistrano3-puma", "5.2.0"
  gem "capistrano-bundler"
  gem "capistrano-npm"
  gem "capistrano-rails", require: false
  gem "capistrano-rvm"
  gem "debug", ">= 1.0.0"
  gem "ed25519", ">= 1.2", "< 2.0"
  gem "factory_bot_rails"
  gem "json-schema"
  gem "rspec-json_expectations"
  gem "rspec-rails"
  gem "rswag-specs"
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "sshkit-sudo"
end

group :development do
  gem "rubocop"
  gem "rubocop-shopify", require: false
  gem "rubocop-rails"
  gem "simplecov", require: false, group: :test
  gem "web-console"
end
group :test do
  gem "database_cleaner"
  gem "faker", ">= 1.9.0"
  gem "rubocop-faker"
  gem "shoulda-matchers", "~> 3.1"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
