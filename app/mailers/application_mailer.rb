# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'Портал пончики <postmaster@probonuts.ru>'
  layout 'mailer'
end
