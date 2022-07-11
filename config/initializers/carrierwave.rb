CarrierWave.configure  do |config|
    config.asset_host = Rails.application.config.action_mailer.default_url_options[:host]
  end