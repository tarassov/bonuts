# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'donuts@cki.com.ru'
  layout 'mailer'
end
