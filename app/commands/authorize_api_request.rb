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
    @user ||= User.find(decoded_auth_token[:user_id]) if decoded_auth_token
    @user || errors.add(:token, 'Invalid token') && nil
  rescue ActiveRecord::RecordNotFound
    errors.add(:token, 'Invalid token')
  end

  def decoded_auth_token
    if http_auth_header
      @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
    end
  end

  def http_auth_header
    if headers['Authorization'].present?
      return JSON.parse headers['Authorization'].split(' ').last
    else errors.add(:token, 'Missing token')
    end

    nil
  rescue JSON::ParserError => e
    errors.add(:token, 'Missing token')
    nil
  end
end
