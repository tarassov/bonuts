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

    if from_id && !is_for_distrib
      return unless check_profile from_id
    else
      return unless check_admin
    end
    
    ActiveRecord::Base.transaction do
            users.each do |id|
              if is_for_distrib           
                command = SharePoints.call({
                  from_profile_id: @current_profile.id,
                  to_profile_id: id,
                  amount: amount,
                  extra_content: comment,
                })                
              else
                command = SendPoints.call({
                  from_profile_id: from_id, 
                  to_profile_id: id,
                  amount: amount,
                  comment: comment})                
              end

              unless command.success?
                render_error :forbidden, send_points.errors[:error].first 
                raise ActiveRecord::Rollback
              end
            end                      

    end

    if is_for_distrib && comment
      LogPublic.call({from_profile_id: @current_profile.id, content: comment})
    end
    
 

  end
  private


  def operation_params
    params.permit(:account_id, :amount, :from_profile_id, :comment,:is_for_distrib,:to_profile_ids=>[])
  end
end
