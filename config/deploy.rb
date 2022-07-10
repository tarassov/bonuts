require 'capistrano/rvm'
require 'capistrano/bundler'
# require "whenever/capistrano"
# require 'capistrano/puma'

# config valid for current version and patch releases of Capistrano
lock '~> 3.17.0'

set :application, 'bonuts'
set :repo_url, 'git@github.com:tarassov/bonuts.git'

set :rvm_ruby_version, '3.1.2@bonuts'

set :whenever_identifier, -> { "#{fetch(:application)}_#{fetch(:stage)}" }

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true
set :pty, true

# Default value for :linked_files is []
set :linked_files, %w[config/database.yml config/secrets.yml]

# Default value for linked_dirs is []
set :linked_dirs, %w[public/uploads tmp/pids tmp/cache tmp/sockets public/system]
append :linked_dirs, '.bundle'

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
set :keep_releases, 10
