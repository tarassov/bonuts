# frozen_string_literal: true

class NotifyMailer < ApplicationMailer
  def notification(params)
    @email = params[:email]
    @main_text = params[:main_text]
    @title = params[:title]
    @footer = params.fetch(:footer, false)
    @subject = params.fetch(:subject, nil)

    @subject ||= 'Новое уведомление от почиков'

    mail(to: @email, subject: @subject)
  end
end
