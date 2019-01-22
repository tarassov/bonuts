class EventsController < ApiController

  skip_before_action :authenticate_request

  
  def index
      events = paginate Event.all
      json_response EventSerializer.new(events,{}).serialized_json
  end
end
