class User < ApplicationRecord
  has_secure_password
  before_save :default_values
  has_many :profiles

  # validations
  validates_presence_of  :email, :password_digest,:last_name,:first_name
  validates :email, uniqueness: true
  has_many :profiles
  
  mount_uploader :avatar, AvatarUploader


  def default_values
      self.locale ||= "ru"
      self.zone ||= "Moscow"
      self.set_confirmation_token if !self.email_confirmed
  end

  def set_confirmation_token
   if self.confirm_token.blank?
       self.confirm_token = SecureRandom.urlsafe_base64.to_s
     end
  end

  def validate_email
    self.email_confirmed = true
    self.confirm_token = nil
  end


  def set_recover_token
        self.recover_token = JsonWebToken.encode(email: self.email, exp: 1.hour.from_now)
  end

  def name
    [first_name, last_name].join(' ')
  end

end
