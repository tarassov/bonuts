CarrierWave.configure do |config|
  config.asset_host = if Rails.env.development? || !Rails.configuration.bonuts_config
                        Rails.application.config.action_mailer.default_url_options[:host]
                      else
                        Rails.configuration.bonuts_config['api'] || 'https://api.bonuts.ru'
                      end
end
