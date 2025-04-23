# frozen_string_literal: true

# Defines events abilities
class Abilities::EventAbility < Abilities::BaseAbility
  def admin_abilities(profile)
    can :edit, Event, tenant: profile.tenant
  end

  def member_abilities(profile)
    can :edit, Event, profile:
  end
end
