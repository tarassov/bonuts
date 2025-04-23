# frozen_string_literal: true

class Abilities::DonutAbility < Abilities::BaseAbility

  def admin_abilities profile
    can :manage, Donut, tenant: profile.tenant
    can :create, Donut
  end

  def store_admin_abilities profile
    can :manage, Donut, tenant: profile.tenant
    can :create, Donut
  end

  def user_abilities(profile)
    can :read, Donut, tenant: profile.tenant
  end

  def member_abilities(profile)
    can :read, Donut, tenant: profile.tenant
  end

end
