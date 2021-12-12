# frozen_string_literal: true

class Api::V1::ProfilesController < Api::V1::ApiController
  include AbilityObsolete

  before_action :set_profile, only: %i[update destroy]

  def index
    profiles = Profile.where(tenant_id: current_tenant.id, active: true)
    json_response(ProfileSerializer.new(profiles, {   params: {
                                          show_score: user_params.fetch(:show_score, false),
                                          show_balance: user_params.fetch(:show_balance, false),
                                          show_sent: user_params.fetch(:show_sent, false)
                                        } }).serializable_hash.to_json)
  end

  def show
    json_response(ProfileSerializer.new(@current_profile,
                                        { include: [:user], params: { show_account: true } }).serializable_hash.to_json)
  end


  def update
    if check_tenant(@profile)
      is_admin = @current_profile.admin
      if is_admin || @profile.id == @current_profile.id
        ActiveRecord::Base.transaction do
          user = @profile.user
          if is_admin
            @profile.admin = user_params[:admin]
            @profile.store_admin = user_params[:store_admin]
            @profile.active = user_params[:active]
            @profile.department_id = user_params[:department_id]
            # user.email = user_params[:email]
          end
          user.first_name = user_params[:first_name]
          user.last_name = user_params[:last_name]
          user.email = user_params[:email]
          @profile.position = user_params[:position]
          if @profile.save! && user.save!
            json_response(ProfileSerializer.new(@profile, { include: [:user] }).serializable_hash.to_json)
          end
        end

      else
        render_error
      end
    end
  rescue StandardError => e
    render_error :forbidden, e
  end

  private

  def user_params
    params.permit(:id, :admin, :default, :active, :first_name, :last_name, :department_id, :position, :email, :name, :show_score, :show_sent,
                  :show_balance, :store_admin)
  end

  def profile_params; end

  def set_profile
    @profile = Profile.find(user_params[:id])
  end
end
