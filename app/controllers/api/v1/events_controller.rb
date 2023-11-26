# frozen_string_literal: true

class Api::V1::EventsController < Api::V1::ApiController
  # skip_before_action :authenticate_request
  def show
    json_response EventSerializer.new(event, { params: { include_comments: true, profile: @current_profile } }).serializable_hash.to_json,
                  :ok, event
  end

  def index
    # or(account_id: @current_user.distrib_account.id)
    # if check_admin
    if @current_profile
      events = Event.left_joins(profile: :user, account: [{ profile: :user }])
      all_events = if event_params.fetch(:showMine, false) == 'true'
                     events.where(account: @current_profile.distrib_account, tenant_id: current_tenant.id)
                           .or(events.where(account: @current_profile.self_account, tenant_id: current_tenant.id))
                           .or(events.where(profile: @current_profile, tenant_id: current_tenant.id))
                   else
                     events.where(public: true, tenant_id: current_tenant.id)
                           .or(events.where(account: @current_profile.distrib_account, tenant_id: current_tenant.id))
                           .or(events.where(account: @current_profile.self_account, tenant_id: current_tenant.id))
                   end

      if params[:searchText]
        all_events = all_events.where('LOWER(content) LIKE ? or LOWER(users_profiles.last_name)  LIKE ? or LOWER(users.last_name) LIKE ?',
                                      "%#{Event.sanitize_sql_like(params[:searchText].downcase)}%",
                                      "%#{Event.sanitize_sql_like(params[:searchText].downcase)}%",
                                      "%#{Event.sanitize_sql_like(params[:searchText].downcase)}%")
        # all_events = all_events.or(events.where('LOWER(users_profiles.last_name) LIKE ?',
        #                                         "%#{Event.sanitize_sql_like(params[:searchText].downcase)}%"))
        # all_events = all_events.or(events.where('LOWER(users.last_name) LIKE ?',
        #                                         "%#{Event.sanitize_sql_like(params[:searchText].downcase)}%"))
      end

      events = paginate all_events
               .order(event_date: :desc)

      response.headers['request_date'] = DateTime.now

      json_response EventSerializer.new(events, { params: { profile: @current_profile } }).serializable_hash.to_json
    end
    #  end
  end

  def update
    if current_tenant.id == event.profile.tenant.id && event_params[:like]
      if event.likes.any? { |like| like.profile == @current_profile }
        like = event.likes.where(profile: @current_profile)
        event.likes.delete(like)
        event.save
      else
        like = Like.new({ profile_id: @current_profile.id })
        event.likes << like
        like.save
      end
      json_response EventSerializer.new(event, { params: { profile: @current_profile } }).serializable_hash.to_json
    else
      logic_call EditEvent, event_params.merge({ event: })
    end
  end

  private

  def event_params
    params.permit(:content, :from_profile, :id, :like, :showMine, :searchText)
  end

  def event
    @event ||= Event.find(event_params[:id])
  end
end
