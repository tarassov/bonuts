CarrierWave.configure  do |config|
  if Rails.env.development?
    config.asset_host = Rails.application.config.action_mailer.default_url_options[:host]
  else
    config.asset_host = "https://api.bonuts.ru"
  end  
  end