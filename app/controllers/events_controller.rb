class EventsController < ApiController


 #skip_before_action :authenticate_request


  def index
    #or(account_id: @current_user.distrib_account.id)
      # if check_admin

          events = paginate Event.where(public:  true, tenant_id: current_tenant.id)
                      .or(Event.where(account: @current_user.distrib_account,tenant_id: current_tenant.id))
                      .or(Event.where(account: @current_user.self_account,tenant_id: current_tenant.id))
                      .order(event_date: :desc)


          response.headers['request_date'] = DateTime.now

          json_response EventSerializer.new(events,{}).serialized_json
    #  end
  end
end
