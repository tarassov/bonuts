# frozen_string_literal: true
class Abilities::PluginAbility < Abilities::BaseAbility
  def admin_abilities(profile)
    can :activate, Plugin
    can :edit, Plugin, { tenant: profile.tenant }
  end

end



