class EventsController < ApiController


 #skip_before_action :authenticate_request
  def show
    json_response EventSerializer.new(event,{params: { include_comments: true,profile: @current_profile }}).serialized_json, :ok, event
  end

  def index
    #or(account_id: @current_user.distrib_account.id)
      # if check_admin
          if @current_profile
            events = paginate Event.where(public:  true, tenant_id: current_tenant.id)
                        .or(Event.where(account: @current_profile.distrib_account,tenant_id: current_tenant.id))
                        .or(Event.where(account: @current_profile.self_account,tenant_id: current_tenant.id))
                        .order(event_date: :desc)

            response.headers['request_date'] = DateTime.now

            json_response EventSerializer.new(events,{params: { profile: @current_profile }}).serialized_json
        end
    #  end
  end

  def update
    if (current_tenant.id ==  event.profile.tenant.id && event_params[:like])
      if event.likes.any? {|like| like.profile == @current_profile}
        like  = event.likes.where(profile: @current_profile)
        event.likes.delete(like)
        event.save
      else
        like = Like.new({profile_id: @current_profile.id})
        event.likes << like
        like.save           
      end  
      json_response EventSerializer.new(event,{params: { profile: @current_profile }}).serialized_json
    end   
  end

  private

  def event_params
    params.permit(:content, :from_profile, :id, :like)
  end

  def event
    @event ||= Event.find(event_params[:id])
  end
end
