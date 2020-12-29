# frozen_string_literal: true
class ConfirmEmailNotifier < Notifier
def get_addresses
  @emails
end


def get_main_text
  @url
  # link_to {I18n.t('mailer.confirm_registration')} , @url 
end

def get_title
  @name
end

def get_subject
  I18n.t('mailer.new_user_welcome')
end

def get_footer
  'С уважением, Ваши Пончики'
end

def mailer 
  UserMailer
end
def mailer_method
  :registration_confirmation
end
protected

def prepare_notification(action); 
  @emails = Array.new
  @url  = Rails.application.config.action_mailer.default_url_options[:host] + "/confirm_email/" + action.user.confirm_token
  @name  = action.user.name
  @emails << "#{action.user.name} <#{action.user.email}>"
end
end
