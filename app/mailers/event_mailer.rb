# frozen_string_literal: true

class EventMailer < ApplicationMailer
  def new_event(params)
    @email = params[:email]
    @content = params[:content]
    @extra_content = params[:extra_content]
    @is_receiver = params.fetch(:is_receiver, false)
    @event_type = params.fetch(:event_type, nil)

    subject = if @event_type && @event_type.name != 'account'
                @event_type.description
              elsif @is_receiver
                'У вас новые баллы'
              else
                'Оповещение о баллах ваших сотрудников'
              end

    mail(to: @email, subject: subject)
  end
end
