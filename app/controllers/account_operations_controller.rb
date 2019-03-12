class AccountOperationsController < ApiController

  def create
      from_id = operation_params[:from_account_id]
      amount = operation_params[:amount].to_i
      users =   operation_params[:to_profile_ids]
      comment =operation_params[:comment]
      events = Array.new
      tenant_id =  current_tenant.id
      ActiveRecord::Base.transaction do
            users.each do |id|
              to_account_id = Profile.find(id).self_account.id
              if  from_id
                distrib_account = DistribAccount.find(from_id)

                if @current_profile.distrib_account.id == distrib_account.id
                  event = distrib_account.send_points to_account_id, amount, comment
                  events.push(event)
                else
                 render json: { error: 'Operation forbidden' }, status: 403
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
      events.each do |event|
        puts event
        EventMailer.new_event(event).deliver_later
      end

  end
  private


  def operation_params
    params.permit(:amount, :from_account_id, :comment,:to_profile_ids=>[])
  end
end
