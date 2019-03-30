module Ability
  def check_admin
    if  @current_profile && @current_profile.admin
      render true
    else
      render_error :forbidden, 'you have to be admin'
      return false
    end
  end


end
