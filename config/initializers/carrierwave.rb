CarrierWave.configure do |config|
  config.asset_host = if Rails.env.development?
                        Rails.application.config.action_mailer.default_url_options[:host]
                      else
                        Rails.configuration.bonuts_config['bonuts_config'] || 'https://api.bonuts.ru'
                      end
end
