module Ability
  def check_admin
    if  @current_profile && @current_profile.admin
      return true
    else
      render_error :forbidden, 'you have to be admin'
      return false
    end
  end

  def check_tenant object

    if !object
      render_error :not_found, 'object not found'
      return false
    end

    if   @current_tenant.id == object.tenant_id
      return true
    else
      render_error :forbidden, 'object does not belong to your tenant'
      return false
    end
  end

  def check_profile profile_id
    if  @current_profile.id == profile_id
      return true
    else  
      render_error :forbidden, 'forbidden opertaion with profile'
      return false
    end
  end


end
