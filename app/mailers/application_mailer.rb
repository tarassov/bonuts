# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'Портал пончики <postmaster@mg.bonuts.ru>'
  layout 'mailer'
end
