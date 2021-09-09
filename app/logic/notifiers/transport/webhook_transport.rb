# frozen_string_literal: true

class WebhookTransport < TransportBase
  def do_send(notifier)
    unless notifier.args[:tenant].demo
      # find in plugin setting mattermost settings
      # if mattermost active - continue
      # get mattermost server address
      # get token
      # search user https://mattermost.cki-com.ru/api/v4/users/search
      # get first user from array
      # create direct channel https://mattermost.cki-com.ru/api/v4/channels/direct ["8wumo3t8j3nqb8ejeidizayrow","fptsem7xttf4zn9ie8rkzmthdo"]
      # post direct message https://mattermost.cki-com.ru/api/v4/posts {"channel_id": "n5mfstz3i3djmbzeo8ri1nj4gw","message": "test"}

      notifier.args[:tenant].plugins.each do |plugin|
        clazz = (plugin.name.capitalize + 'Hook').constantize
        notifier.get_addresses.each do |email|
          clazz.call({
                       email: email,
                       main_text: notifier.get_main_text,
                       token: '',
                       url: ''
                     })
        end
      end
    end
  end
end
