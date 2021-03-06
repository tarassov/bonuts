require 'mattermost'

class MattermostJob < ActiveJob::Base
  # Set the Queue as Default
  queue_as :default

  def perform(email, message, tenant_id)
    @tenant_id = tenant_id
    if client
      return nil unless my_id

      to_user = client.get_user_by_email email
      channel = client.create_direct_channel(my_id, to_user.body['id']) if to_user.body['id']
      client.create_post({ channel_id: channel.body['id'], message: message }) if channel.body['id']
    end
  end

  protected

  def my_id
    @my_id ||= get_my_id
  end

  def host
    @host ||= Plugin.get_prop @tenant_id, 'mattermost', 'host'
  end

  def key
    @key ||= Plugin.get_prop @tenant_id, 'mattermost', 'key'
  end

  def client
    @client ||= get_client
  end

  private

  def get_client
    return nil if host.nil? || key.nil?

    m_client = Mattermost.new_client(host.value)
    m_client.use_access_token(key.value)
    m_client
  end

  def get_my_id
    me_query = client.get_me
    return me_query.body['id'] if me_query.success?

    nil
  end
end
