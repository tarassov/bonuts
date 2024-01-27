# env :PATH, "/home/alex/.rvm/gems/ruby-2.7.1@donuts/bin:/home/alex/.rvm/gems/ruby-2.7.1@global/bin:/home/alex/.rvm/rubies/ruby-2.7.1/bin:/home/alex/.rvm/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin"
# env :GEM_HOME, "/home/alex/.rvm/gems/ruby-2.7.1@donuts"
# env :GEM_PATH, "/home/alex/.rvm/gems/ruby-2.7.1@donuts:/home/alex/.rvm/gems/ruby-2.7.1@global"
# env :RUBY_VERSION, "ruby-2.7.1"

# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron
# set :environment, "development"
# set :output, "/home/alex/donuts/log/cron.log"
# job_type :runner,  "cd :path && :bundle_command rails runner -e :environment ':task' :output"

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 10.minutes do
#   runner "TestOperation.call"
# end
every 20.minutes do
  #   command "/usr/bin/some_great_command"
  # runner "TestOperation.call"
  runner 'DailyJob.call'
  #   rake "some:great:rake:task"
end

every 1.hour do
  runner 'BirthdayJob.call'
end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever
