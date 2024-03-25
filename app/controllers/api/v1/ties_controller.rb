# frozen_string_literal: true

class Api::V1::TiesController < Api::V1::ApiController
  def index
    if @current_profile && check_admin
      json_response(Deal
                      .created_after(ties_params[:date_from]&.to_date)
                      .created_before(ties_params[:date_to]&.to_date)
                      .transfers_by_tenant(@current_profile.tenant)
                      .left_joins(withdrawl_operations: { account: :profile })
                      .left_joins(deposit_operations: { account: :profile })
                      .where("profiles.active = True and profiles_accounts.active = True")
                      .select("profiles.user_id as from_id", "profiles_accounts.user_id as to_id").distinct)
    end
  end

  def ties_params
    params.permit(:uploaded_image, :id, :tenant, :date_from, :date_to)
  end
end
