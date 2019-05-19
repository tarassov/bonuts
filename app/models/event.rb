class Event < ApplicationRecord
  belongs_to :profile
  belongs_to :account, optional: true
  belongs_to :tenant
  belongs_to :account_operation, optional: true

  def self.log_public args
    profile = args[:profile]
    content = args[:content]
    extra_content = args.fetch(:extra_content,"")
    account = args.fetch(:account, nil)
    account_operation = args.fetch(:account_operation, nil)
    account = account_operation.account if account_operation
    
    Event.create!({
      tenant: profile.tenant,
      profile: profile,
      account: account,
      account_operation: account_operation,
      content: content,
      extra_content: extra_content,
      event_date: DateTime.now,
      public: true})
  end

  def self.log_operation args
    account_operation = args[:account_operation]
    extra_content = args.fetch(:extra_content,"")

    if account_operation.direction == -1
      content = "Списание "+ account_operation.amount.to_s + " pts  "
    else
      if account_operation.account is SelfAccount
        content = "Счет пополнен на "+ account_operation.amount.to_s + " pts  "
      else
        content = "Счет распределения пополнен на "+ account_operation.amount.to_s + " pts  "
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

end
