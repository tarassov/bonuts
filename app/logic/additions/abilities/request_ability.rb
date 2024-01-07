# frozen_string_literal: true

class RequestAbility < BaseAbility
  def admin_abilities(profile)
    can :manage, Request, profile: { tenant: profile.tenant }
    can :refund, Request, profile: { tenant: profile.tenant, id: profile.id }, status: 0
    can :create, Request
  end

  def store_admin_abilities(profile)
    can :manage, Request, profile: { tenant: profile.tenant }
    can :create, Request
  end

  def user_abilities(profile)
    can :refund, Request, profile: { id: profile.id }, status: 0
    can :read, Request, profile:
  end

  def member_abilities(profile)
    can :read, Request, profile:
  end
end
