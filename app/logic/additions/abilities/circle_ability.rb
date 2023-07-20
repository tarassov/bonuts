# frozen_string_literal: true

class CircleAbility < BaseAbility
  def admin_abilities(profile)
    can :edit, Circle, tenant: profile.tenant
    can :delete, Circle
    can :create, Circle
  end
end
