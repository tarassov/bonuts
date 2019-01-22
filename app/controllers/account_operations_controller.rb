class AccountOperationsController < ApiController

  def create
      from_id = operation_params[:from_account_id]
      amount = operation_params[:amount].to_i
      to_account_id = User.find(operation_params[:to_user_id]).self_account.id
      comment =operation_params[:comment]
      if  from_id
        distrib_account = DistribAccount.find(from_id)

        if @current_user.distrib_account.id == distrib_account.id
          distrib_account.send_points to_account_id, amount, comment
        else
         render json: { error: 'Operation forbidden' }, status: 403
        end
      else
      end
  end
  private


  def operation_params
    params.permit(:amount, :to_user_id, :from_account_id, :comment)
  end
end
