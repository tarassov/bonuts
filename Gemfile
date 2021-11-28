# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.8'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.3'

# Use postgresql as the database for Active Record
gem 'pg'

# Use Puma as the app server
gem 'puma'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
gem 'mini_magick', '~> 4.8'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'

gem 'foreman', '>= 0.84'
gem 'rswag'
gem 'cancancan'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  # gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'capistrano', require: false
  gem 'capistrano3-puma', require: false
  gem 'capistrano-bundler'
  gem 'capistrano-npm'
  gem 'capistrano-rails', require: false
  gem 'capistrano-rvm'
  gem 'debase'
  gem 'factory_bot_rails'
  gem 'json-schema_builder'
  gem 'rspec-json_expectations'
  gem 'rspec-rails', '~> 3.5'
  gem 'rswag-specs'
  gem 'ruby-debug-ide'
  gem 'sshkit-sudo'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'rubocop', require: false
  gem 'rubocop-rails'
  gem 'simplecov', require: false, group: :test
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end
group :test do
  gem 'database_cleaner'
  gem 'faker', '>= 1.9.0'
  gem 'rubocop-faker'
  gem 'shoulda-matchers', '~> 3.1'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

gem 'carrierwave', '>= 2.0.0.rc', '< 3.0'
# ActiveAdmin
# gem 'activeadmin'

# Plus integrations with:
gem 'bcrypt'
gem 'draper'
gem 'jwt'
gem 'kaminari'
gem 'pundit'
gem 'sidekiq'

gem 'simple_command'

gem 'jsonapi-serializer'

gem 'api-pagination'
gem 'mattermost-api4-ruby', git: 'https://github.com/tarassov/mattermost-api4-ruby.git'
gem 'pry'
gem 'public_uid'
gem 'rails-i18n'
gem 'rest-client'
gem 'whenever'
