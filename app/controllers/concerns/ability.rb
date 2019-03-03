module Ability
  def check_admin

    if current_position && current_position.admin
      render true
    else
      render json: {:error => true, :message => "Нет доступа"}, status: :forbidden
      return false
    end
  end


end
