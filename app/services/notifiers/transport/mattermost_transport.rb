class Notifiers::Transport::MattermostTransport < Notifiers::Transport::TransportBase
  def do_send(notifier)
    return unless notifier.tenant

    unless notifier.demo && !Rails.env.development?
      notifier.addresses.each do |email|
        email = "tarasov_al@cki.com.ru" if Rails.env.development?
        MattermostJob.perform_later(email, notifier.main_text, notifier.tenant.id)
      end
    end
  end
end
