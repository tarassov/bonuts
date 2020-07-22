# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'Портал пончики <info@bonuts.ru>'
  layout 'mailer'
end
