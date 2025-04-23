# frozen_string_literal: true

class Abilities::CircleAbility < Abilities::BaseAbility
  def admin_abilities(profile)
    can :edit, Circle, { tenant: profile.tenant }
    can :delete, Circle, tenant: profile.tenant
    can :create, Circle
  end
end
