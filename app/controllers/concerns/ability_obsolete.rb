# frozen_string_literal: true

module AbilityObsolete
  def check_admin
    if @current_profile.admin
      true
    else
      render_error :forbidden, 'you have to be admin'
      false
    end
  end

  def check_store_admin
    if @current_profile.store_admin || @current_profile.admin
      true
    else
      render_error :forbidden, 'you have to be store admin'
      false
    end
  end

  def check_system_admin
    if @current_profile.user.system_admin
      true
    else
      render_error :forbidden, 'you have to be system admin'
      false
    end
  end

  def check_tenant(object)
    unless object
      render_error :not_found, 'object not found'
      return false
    end

    if @current_tenant.id == object.tenant_id
      true
    else
      render_error :forbidden, 'object does not belong to your tenant'
      false
    end
  end

  def check_profile(profile_id)
    if @current_profile.id.to_s == profile_id.to_s
      true
    else
      render_error :forbidden, 'forbidden opertaion with profile ' + @current_profile.id.to_s + ', ' + profile_id.to_s
      false
    end
  end
end
