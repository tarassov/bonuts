# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  before_save :default_values
  has_many :profiles

  # validations
  validates_presence_of :email, :password_digest, :last_name, :first_name
  validates :email, uniqueness: true

  mount_uploader :avatar, AvatarUploader

  def default_values
    self.locale ||= 'ru'
    self.zone ||= 'Moscow'
    self.sex = 'unknown' if self.sex.nil?
    set_confirmation_token unless email_confirmed
  end

  def set_confirmation_token
    if confirm_token.blank?
      self.confirm_token = SecureRandom.urlsafe_base64.to_s
      end
  end

  def reset_confirmation_token
      self.confirm_token = SecureRandom.urlsafe_base64.to_s
  end

  def validate_email
    self.email_confirmed = true
    self.confirm_token = nil
    self.active = true
  end

  def set_recover_token
    self.recover_token = JsonWebToken.encode(email: email, exp: 1.hour.from_now)
  end

  def self.generate_password
     return SecureRandom.hex(6)
  end

  def name
    [first_name, last_name].join(' ')
  end
end
