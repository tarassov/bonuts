class UserMailer < ApplicationMailer
  def registration_confirmation(user)
    @user = user
    #mail(:to => "#{user.name} <#{user.email}>", :subject => "Registration Confirmation")
     mail(to: "#{user.name} <tarasov_al@cki.com.ru>", subject: 'Registration Confirmation')
  end
end
