class User < ApplicationRecord
  has_secure_password
  before_save :default_values

  # validations
  validates_presence_of :name, :email, :password_digest,:last_name,:first_name
  validates :email, uniqueness: true
  has_one :self_account
  has_one :distrib_account

  def default_values
      self.self_account = SelfAccount.create if self.self_account.nil?
      self.distrib_account = DistribAccount.create if self.distrib_account.nil?
      self.active  = true
      self.locale = "ru"
      self.zone = "Moscow"
      self.set_confirmation_token
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
    if self.recover_token.blank?
        self.recover_token = JsonWebToken.encode(email: self.email, exp: 1.days.from_now)
      end
  end

end
