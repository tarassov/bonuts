# frozen_string_literal: true

class EmailTransport < TransportBase
  def do_send(notifier)
    unless notifier.demo  && !Rails.env.development?
      notifier.get_addresses.each do |email|
        mailer  = notifier.mailer
        sender = mailer.send notifier.mailer_method, ({
                                    email: email,
                                    main_text: notifier.get_main_text,
                                    title: notifier.get_title,
                                    subject: notifier.get_subject,
                                    footer: notifier.get_footer
                                  })
        sender.deliver_later                         
      end
    end  
  end
end
