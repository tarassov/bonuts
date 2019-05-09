class AccountOperationsController < ApiController

  def create
    from_id = operation_params[:from_profile_id]
    amount = operation_params[:amount].to_i
    users =   operation_params[:to_profile_ids]
    comment =operation_params[:comment]
    tenant_id =  current_tenant.id


    if from_id
      return unless check_profile from_id
    else
      return unless check_admin
    end

    ActiveRecord::Base.transaction do
            users.each do |id|
              if  from_id
                send_points = SendPoints.call({from_profile_id: from_id, to_profile_id: id,amount: amount,comment: comment})
                unless send_points.success?
                  render_error :forbidden, send_points.errors[:error].first 
                  raise ActiveRecord::Rollback
                end
              else
                  to_account = Profile.find(id).distrib_account
                  event = to_account.admin_deposit amount, comment, @current_profile
                  events.push(event)
              end

            end
            #EventMailer.with(user: @current_user).new_event(@current_user).deliver_later
    end

  end
  private


  def operation_params
    params.permit(:amount, :from_profile_id, :comment,:to_profile_ids=>[])
  end
end
