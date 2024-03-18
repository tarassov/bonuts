# frozen_string_literal: true

class Api::V1::TiesController < Api::V1::ApiController
  def index
     if @current_profile && check_admin
       json_response Deal
                       .left_joins(withdrawl_operations: {account: :profile})
                       .left_joins(deposit_operations: {account: :profile})
                       .where(:deal_type => "transfer",account_operations: {accounts: {tenant: current_tenant}})
                       .select("profiles.user_id as from_id","profiles_accounts.user_id as to_id").distinct
     end
  end

  def  avatar_params
    params.permit(:uploaded_image, :id, :tenant)
  end
end
