class TestOperation
  def self.call
    puts 'running job'
    @action_factory = ActionFactory.new
    @action = @action_factory.test({ comment: 'test' })
    notifier = Notifiers::InfoNotifier.new({ comment: 'test' })
    notifier.add_transport(Notifiers::Transport::UnifiedTransport.new)
    @action.attach_notifier notifier
    @action.call
  end
end
