# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron
set :environment, "development"
set :output, "/mnt/c/Users/Alexander/projects/donuts/log/cron.log"
# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
 every 15.minute do
#   command "/usr/bin/some_great_command"
   runner "TestOperation.call"
#   rake "some:great:rake:task"
 end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever
