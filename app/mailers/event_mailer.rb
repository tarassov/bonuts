class EventMailer < ApplicationMailer

  def new_event event
    @event = event
    mail(to: event.account.user.email, subject: ' New donuts')
  end
end
