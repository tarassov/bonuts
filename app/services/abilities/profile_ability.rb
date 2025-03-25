# frozen_string_literal: true

class Abilities::ProfileAbility < Abilities::BaseAbility
  def admin_abilities(profile)
    can :administrate, Profile, tenant: profile.tenant
    can :create, Profile, tenant: profile.tenant
  end

  def store_admin_abilities(profile)
    ;
  end

  def user_abilities(profile)
    #  can :create,
  end

  def visitor_abilities(_user)
    can :read, :all
  end
end
