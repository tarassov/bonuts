class Event < ApplicationRecord
  belongs_to :profile
  belongs_to :account, optional: true
  belongs_to :tenant
  belongs_to :account_operation, optional: true
  belongs_to :event_type,optional: true


  #before_save :default_values

  def self.log_public args
    profile = args[:profile]
    content = args[:content]
    extra_content = args.fetch(:extra_content,"")
    account = args.fetch(:account, nil)
    account_operation = args.fetch(:account_operation, nil)
    account = account_operation.account if account_operation
    event_type_name = args.fetch(:event_type_name,"account")

    event_type = EventType.find_by_name(event_type_name)
    
    Event.create!({
      tenant: profile.tenant,
      profile: profile,
      account: account,
      account_operation: account_operation,
      content: content,
      extra_content: extra_content,
      event_date: DateTime.now,
      event_type: event_type,
      public: true})
  end

  def self.log_private args
    profile = args[:profile]
    content = args[:content]
    extra_content = args.fetch(:extra_content,"")
    account = args.fetch(:account, nil)
    account_operation = args.fetch(:account_operation, nil)
    account = account_operation.account if account_operation
    event_type_name = args.fetch(:event_type_name,"account")

    event_type = EventType.find_by_name(event_type_name)
    
    Event.create!({
      tenant: profile.tenant,
      profile: profile,
      account: account,
      account_operation: account_operation,
      content: content,
      extra_content: extra_content,
      event_date: DateTime.now,
      event_type: event_type,
      public: false})
  end

  def self.log_operation args
    account_operation = args[:account_operation]
    extra_content = args.fetch(:extra_content,"")

    if account_operation.direction == -1
      content = "Списание "+ account_operation.amount.to_s + " pts  "
    else
      if account_operation.account.is_a? SelfAccount
        content = "Ваш cчет пополнен на "+ account_operation.amount.to_s + " pts  "
      else
        content ="Вам перевели "+ account_operation.amount.to_s + " pts, которые вы можете подарить   "
      end
    end

    Event.create!({
      tenant: account_operation.account.tenant,
      profile: account_operation.account.profile,
      account: account_operation.account,
      account_operation: account_operation,
      content: content,
      extra_content: extra_content,
      event_date: DateTime.now,
      public: false})
  end

  def date_string
    #zone = ActiveSupport::TimeZone.new("Moscow")
    self.event_date.in_time_zone(self.profile.user.zone).strftime("%d/%m/%Y %H:%M") if self.profile
  end

  def profiles_to_notify
    users = Array.new
    users << self.account.profile if self.account
    users << self.account.boss_profile if self.account && self.account.boss_profile 
    users << self.profile.boss_profile if self.profile && self.profile.boss_profile
    users.uniq
  end



end
