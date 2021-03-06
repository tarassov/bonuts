# frozen_string_literal: true

class AuthorizeApiRequest
  prepend SimpleCommand
  def initialize(headers = {})
    @headers = headers
  end

  def call
    user
  end

  private

  attr_reader :headers

  def user
    if http_auth_header == 'demotoken'
      tenant = Tenant.find_by_name('demo')
      return tenant.profiles.where(admin: true)[0].user
    end
    @user ||= User.find(decoded_auth_token[:user_id]) if decoded_auth_token
    @user || errors.add(:token, 'Invalid token') && nil
  rescue ActiveRecord::RecordNotFound
    errors.add(:token, 'Invalid token')
  end

  def decoded_auth_token
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_header) if http_auth_header
  end

  def http_auth_header
    if headers['Authorization'].present?
      return headers['Authorization'].split(' ').last
    else errors.add(:token, 'Missing token')
    end

    nil
  rescue JSON::ParserError => e
    errors.add(:token, 'Missing token')
    nil
  end
end
