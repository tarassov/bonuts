# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  before_save :default_values

  has_many :profiles, dependent: :destroy
  has_many :tenants, through: :profiles
  has_one :telegram_chat, dependent: :destroy

  # validations
  validates :email, :password_digest, :last_name, :first_name, presence: true
  validates :email, uniqueness: true

  attribute :email_confirmed, default: -> { false }

  mount_uploader :avatar, AvatarUploader

  class << self
    def generate_password
      SecureRandom.hex(6)
    end
  end

  def default_values
    self.locale ||= "ru"
    self.zone ||= "Moscow"
    self.sex = "unknown" if sex.nil?
    set_confirmation_token unless email_confirmed
  end

  def set_confirmation_token
    self.confirm_token = SecureRandom.urlsafe_base64.to_s if confirm_token.blank?
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
    self.recover_token = JsonWebToken.encode(email:, exp: 12.hours.from_now)
  end

  def generate_tg_code
    self.tg_code = rand(100000...999999)
  end

  def name
    [first_name, last_name].join(" ")
  end

  def domain
    email.gsub(/.+@([^.].+)/, '\1')
  end
end
