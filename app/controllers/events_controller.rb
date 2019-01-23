class EventsController < ApiController

  skip_before_action :authenticate_request


  def index
      events = paginate Event.all.order(event_date: :desc)
      response.headers['request_date'] = DateTime.now
      json_response EventSerializer.new(events,{}).serialized_json
  end
end
