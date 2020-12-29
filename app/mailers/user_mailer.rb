# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def registration_confirmation(args)
    @title = args[:title]
    @main_text =args[:main_text]
    # mail(:to => "#{user.name} <#{user.email}>", :subject => "Registration Confirmation")
    mail(to: args[:email], subject: args[:subject])
  end

  def change_password(user)
    @user = user
    mail(to: "#{user.name} <#{user.email}>", subject: 'Смена пароля')
  end
end
