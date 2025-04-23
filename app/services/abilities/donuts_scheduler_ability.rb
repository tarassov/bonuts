# frozen_string_literal: true

class Abilities::DonutsSchedulerAbility < Abilities::BaseAbility
  def admin_abilities(profile)
    can :manage, DonutsScheduler, profile: { tenant: profile.tenant }
    can :create, DonutsScheduler
  end

  def store_admin_abilities(profile)
    can :manage, DonutsScheduler, profile: { tenant: profile.tenant }
    can :create, DonutsScheduler
  end

  def user_abilities(profile)
    ;
  end

  def member_abilities(profile)
    ;
  end
end
