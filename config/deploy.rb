require "capistrano/rvm"
require 'capistrano/npm'
require 'capistrano/bundler'


# config valid for current version and patch releases of Capistrano
lock "~> 3.12.0"

set :application, "donuts"
set :repo_url, " git@bitbucket.org:cki_tarasov/donuts.git"
set :branch,      fetch(:branch, 'deploy')

set :rvm_ruby_version, '2.6.3@donuts'

set :npm_flags, '--production --silent --no-progress --loglevel=error' 

set :puma_threads,    [4, 16]
set :puma_workers,    0


# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to,       "/home/#{fetch(:user)}/web/#{fetch(:application)}"

set :puma_bind,       "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
set :puma_state,      "#{shared_path}/tmp/pids/puma.state"
set :puma_pid,        "#{shared_path}/tmp/pids/puma.pid"
set :puma_access_log, "#{release_path}/log/puma.error.log"
set :puma_error_log,  "#{release_path}/log/puma.access.log"

set :puma_preload_app, true
set :puma_worker_timeout, nil
set :puma_init_active_record, true  # Change to false when not using

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true
set :pty, true

# Default value for :linked_files is []
set :linked_files, %w{config/database.yml config/secrets.yml}


# Default value for linked_dirs is []
set  :linked_dirs, %w{public/uploads tmp/pids tmp/cache tmp/sockets public/system}
append :linked_dirs, '.bundle'

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
set :keep_releases, 6

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure
# or define in block

desc 'Initial Deploy'
task :initial do
    on roles(:app) do
      before 'deploy:restart', 'puma:start'
      invoke 'deploy'
    end
end

desc 'Restart application'
task :restart do
  on roles(:app), in: :sequence, wait: 5 do
    invoke 'puma:restart'
  end
end

before :starting,     :check_revision
after  :finishing,    :compile_assets
after  :finishing,    :cleanup
after  :finishing,    :restart
end

namespace :nginx do
    desc 'Reload nginx'
    task :reload do
      on roles(:web), in: :sequence do
        sudo :service, :nginx, :reload
      end
    end
  
    desc 'Restart nginx'
    task :restart do
      on roles(:web), in: :sequence do
        execute! :sudo, :service, :nginx, :restart
      end
    end
  end
  

namespace :deploy do
     before :starting, :run_ssh_agent do
      sh  "eval `ssh-agent -s`"
      # 'ssh-add ~/.ssh/id_rsa'
    end
  
    after :finishing, :build_client do
        on roles fetch(:app) do
          execute :npm, "run", "deploy"        
        end 
    end      
    after :deploy, 'nginx:reload'
end