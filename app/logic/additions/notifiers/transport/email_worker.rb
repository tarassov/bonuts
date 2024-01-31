class EmailWorker
  include Sidekiq::Job
  sidekiq_options queue: :default, retry: 3, backtrace: true
  def perform(sender)
    sender.deliver_now
  end
end
