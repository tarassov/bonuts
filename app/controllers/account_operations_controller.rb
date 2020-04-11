class AccountOperationsController < ApiController

  def index
    account  = Account.find(operation_params[:account_id])
    if check_profile account.profile_id
      operations = AccountOperation.where(account_id: account.id) 
      json_response AccountOperationSerializer.new(operations,{params: { current_profile: @current_profile }}).serialized_json
    end  
  end
  
  def create
    from_id = operation_params[:from_profile_id]
    amount = operation_params[:amount].to_i
    users =   operation_params[:to_profile_ids]
    comment =operation_params[:comment]
    tenant_id =  current_tenant.id
    is_for_distrib = operation_params.fetch(:is_for_distrib, false)
    share_for_al = operation_params.fetch(:share_for_all, false)
    burn_old = operation_params.fetch(:burn_old, false)
    if amount == 0
      return render_error :forbidden, "Can not be 0"    
    end
    if from_id && !is_for_distrib
      return unless check_profile from_id
    else
      return unless check_admin
    end
    if (share_for_al)
      users = Profile.where(tenant_id: @current_tenant.id, active: true).map{|p| p.id}
    end

    ActiveRecord::Base.transaction do
            users.each do |id|
              if is_for_distrib           
                command = SharePoints.call({
                  from_profile_id: @current_profile.id,
                  to_profile_id: id,
                  amount: amount,
                  extra_content: comment,
                  notify: !@current_profile.user.demo,
                  burn_old: burn_old,
                })                
              else
                command = SendPoints.call({
                  from_profile_id: from_id, 
                  to_profile_id: id,
                  amount: amount,
                  comment: comment,
                  notify: !@current_profile.user.demo
                })                
              end

              unless command.success?
                render_error :forbidden, command.errors[:error].first 
                raise ActiveRecord::Rollback
              end
            end                      

    end

    if is_for_distrib
        LogPublic.call({from_profile_id: @current_profile.id, content: comment, notify: true, event_type_name: "new_donuts"})
    end
    
 

  end
  private


  def operation_params
    params.permit(:account_id, :amount, :from_profile_id, :comment,:is_for_distrib,:share_for_all,:burn_old,:to_profile_ids=>[])
  end
end
