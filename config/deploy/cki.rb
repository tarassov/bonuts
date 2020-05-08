# server-based syntax
# ======================
# Defines a single server with a list of roles and multiple properties.
# You can define all roles on a single server, or split them:
set :user, 'sadmin'
set :branch, 'master'
set :application, 'donuts'
set :rails_env, 'production'

server "192.168.0.236", user: "sadmin", roles: %w{app db web}
set :branch,      fetch(:branch, 'master')
# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/sadmin/www/donuts"

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

set :ssh_options, {:forward_agent => true}

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure
# or define in block

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
    before :starting, :set_rails_env do
      set :rails_env, (fetch(:rails_env) || fetch(:stage))
    end 

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