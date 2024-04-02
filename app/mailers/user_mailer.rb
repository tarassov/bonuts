# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def registration_confirmation(args)
    @title = args[:title]
    @main_text = args[:main_text]
    @url = args[:link]
    # mail(:to => "#{user.name} <#{user.email}>", :subject => "Registration Confirmation")
    mail(to: args[:email], subject: args[:subject])
  end

  def change_password(args)
    @url = args[:link]
    @main_text = args[:main_text]
    mail(to: args[:email], subject: args[:subject])
  end
end
