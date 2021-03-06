# frozen_string_literal: true

class Api::V1::AccountsController < Api::V1::ApiController
  before_action :set_account, only: %i[show update destroy]
  # skip_before_action :authenticate_request, only: [:show]

  def show
    if @account
      json_response(
        AccountSerializer.new(@account,
                              { params: { current_profile: @current_profile } }).serializable_hash.to_json, :ok
      )
    else
      json_response(nil, :not_found)
    end
  end

  private

  def set_account
    @account = Account.find(params[:id])
  end
end
