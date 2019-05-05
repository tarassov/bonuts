class Event < ApplicationRecord
  belongs_to :profile
  belongs_to :account
  belongs_to :tenant

  def self.creat_public (params)
    if params[:receiver].is_a? DistribAccount
      content =  params[:sender].user.name  + " перевел " + params[:amount].to_s + " pts  " + params[:receiver].profile.user.name + " для распределения."
    else
      content =  params[:sender].user.name  + " поблагодарил " + params[:receiver].profile.user.name + ", подарив" + params[:amount].to_s + " pts  "
    end
    Event.create!({tenant: params[:sender].tenant,
      profile: params[:sender],
      account: params[:receiver],
      content: content,
      extra_content: params[:comment],
      event_date: DateTime.now,
      public: params[:public]})
  end

  def self.log_operation args
    account_operation = args[:account_operation]
    context = args.fetch(:context,"")

    if account_operation.direction == -1
      content = "Списание "+ account_operation.amount.to_s + " pts  "
    else
      content = "Счет пополнен на "+ account_operation.amount.to_s + " pts  "
    end

    Event.create!({
      tenant: account_operation.account.tenant,
      profile: account_operation.account.profile,
      account: account_operation.account,
      content: content,
      extra_content: context,
      event_date: DateTime.now,
      public: false})
  end

  def date_string
    #zone = ActiveSupport::TimeZone.new("Moscow")
    self.event_date.in_time_zone(self.profile.user.zone).strftime("%d/%m/%Y %H:%M") if self.profile
  end

end
