class AccountOperationsController < ApiController

  def create
      from_id = operation_params[:from_account_id]
      amount = operation_params[:amount].to_i
      users =   operation_params[:to_user_ids]
      comment =operation_params[:comment]

      ActiveRecord::Base.transaction do
            users.each do |id|
              to_account_id = User.find(id).self_account.id
              if  from_id
                distrib_account = DistribAccount.find(from_id)

                if @current_user.distrib_account.id == distrib_account.id
                  distrib_account.send_points to_account_id, amount, comment
                else
                 render json: { error: 'Operation forbidden' }, status: 403
                  raise ActiveRecord::Rollback
                end
              else
                  to_account = User.find(id).distrib_account
                  to_account.admin_deposit amount, comment, @current_user
              end
            end
        end
  end
  private


  def operation_params
    params.permit(:amount, :from_account_id, :comment,:to_user_ids=>[])
  end
end
