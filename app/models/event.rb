class Event < ApplicationRecord
  belongs_to :profile
  belongs_to :account

  def self.log_operation (params)
    #byebug
    if params[:receiver].is_a? DistribAccount
      content =  params[:sender].user.name  + " перевел " + params[:amount].to_s + " pts  " + params[:receiver].profile.user.name + " для распределения."
    else
      content =  params[:sender].user.name  + " поблагодарил " + params[:receiver].profile.user.name + ", подарив" + params[:amount].to_s + " pts  "
    end
    Event.create!({profile: params[:sender], account: params[:receiver], content: content, extra_content: params[:comment], event_date: DateTime.now, public: params[:public]})
  end

  def date_string
    #zone = ActiveSupport::TimeZone.new("Moscow")
    self.event_date.in_time_zone(self.user.zone).strftime("%d/%m/%Y %H:%M")
  end

end
