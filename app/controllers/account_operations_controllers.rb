class AccountOperationsController < ApiController

  def create
      from_id = params[:from_account_id]
      amount = params[:amount]
      to_account_id = params[:to_account_id]
      if  from_id
        distrib_account = DistribAccount.find(from_id)

        if @current_user.distrib_account.id == distrib_account
          distrib_account.send_points to_account_id, amount
        else
          render json: { error: 'Operation forbidden' }, status: 403
        end
      else
      end
  end
  private


  def params
    params.permit(:amount, :to_account_id, :from_account_id)
  end
end