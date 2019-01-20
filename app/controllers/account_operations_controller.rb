class AccountOperationsController < ApiController

  def create
      from_id = operation_params[:from_account_id]
      amount = operation_params[:amount].to_i
      to_account_id = operation_params[:to_account_id]
      if  from_id
        distrib_account = DistribAccount.find(from_id)

        if @current_user.distrib_account.id == distrib_account.id
          distrib_account.send_points to_account_id, amount
        else
         render json: { error: 'Operation forbidden' }, status: 403
        end
      else
      end
  end
  private


  def operation_params
    params.permit(:amount, :to_account_id, :from_account_id)
  end
end
