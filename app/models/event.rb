class Event < ApplicationRecord
  belongs_to :user
  belongs_to :account

  def self.log_operation (params)
    content =  params[:sender].name  + " gave " + params[:amount].to_s + " pts  to " + params[:receiver].user.name
    Event.create!({user: params[:sender], account: params[:receiver], content: content, extra_content: params[:comment], event_date: DateTime.now})
  end

  def date_string
    #zone = ActiveSupport::TimeZone.new("Moscow")
    self.event_date.in_time_zone(self.user.zone).strftime("%d/%m/%Y %H:%M")
  end

end
