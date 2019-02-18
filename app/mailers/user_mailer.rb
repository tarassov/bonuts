class UserMailer < ApplicationMailer
  def registration_confirmation(user)
    @user = user
    #mail(:to => "#{user.name} <#{user.email}>", :subject => "Registration Confirmation")
     mail(to: "#{user.name} <#{user.email}>", subject: 'Подтверждение регистрации')
  end

  def change_password(user, token)
     @user = users
     mail(to: "#{user.name} <#{user.email}>", subject: 'Смена пароля')
  end
end
