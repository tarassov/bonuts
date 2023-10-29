# frozen_string_literal: true

class TenantAbility < BaseAbility
  def admin_abilities(profile)
    can :administrate, Tenant, id: profile.tenant.id
    can :manage, Tenant, id: profile.tenant.id
  end

  def store_admin_abilities(profile)
    can :join, Tenant, domain: profile.user.domain
    cannot :join, Tenant, id: profile.user.tenant_ids # if has already joined

    can :read, Tenant, id: profile.user.tenant_ids
  end

  def user_abilities(profile)
    can :join, Tenant, domain: profile.user.domain
    cannot :join, Tenant, id: profile.user.tenant_ids # if has already joined

    can :read, Tenant, id: profile.user.tenant_ids
  end

  def visitor_abilities(user)
    # can :read, :all
  end

  def member_abilities(profile)
    can :join, Tenant, domain: profile.user.domain
  end
end
