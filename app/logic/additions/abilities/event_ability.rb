# frozen_string_literal: true

# Defines events abilities
class EventAbility < BaseAbility
  def admin_abilities(profile)
    can :edit, Event, tenant: profile.tenant
  end

  def member_abilities(profile)
    can :edit, Invitation, profile:
  end
end
