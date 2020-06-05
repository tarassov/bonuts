# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.2'

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

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  #gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'capistrano',  require: false
  gem 'capistrano-bundler'
  gem 'capistrano-npm'
  gem 'capistrano-rails',  require: false
  gem 'capistrano-rvm'
  gem 'capistrano3-puma', require: false
  gem 'factory_bot_rails'
  gem 'rspec-json_expectations'
  gem 'rspec-rails', '~> 3.5'
  gem 'sshkit-sudo'
  gem 'ruby-debug-ide'
  gem 'debase'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'rubocop', require: false
  gem 'simplecov', require: false, group: :test
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end
group :test do
  gem 'database_cleaner'
  gem 'faker'
  gem 'rubocop-faker'
  gem 'shoulda-matchers', '~> 3.1'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
#gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

gem 'carrierwave', '>= 2.0.0.rc', '< 3.0'
# ActiveAdmin
#gem 'activeadmin'

# Plus integrations with:
gem 'kaminari'
gem 'draper'
gem 'pundit'
gem 'sidekiq'
gem 'bcrypt'
gem 'jwt'

gem 'simple_command'

gem 'fast_jsonapi'

gem 'api-pagination'
gem 'public_uid'
gem 'rails-i18n'
