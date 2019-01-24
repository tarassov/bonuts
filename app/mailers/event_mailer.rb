class EventMailer < ApplicationMailer

  def new_event event
    @event = event
    mail(to: 'tarasov_al@cki.com.ru', subject: ' New donuts')
  end
end
