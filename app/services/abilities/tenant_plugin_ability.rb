# frozen_string_literal: true

# frozen_string_literal: true
class Abilities::TenantPluginAbility < Abilities::BaseAbility
  def admin_abilities(profile)
    can :edit, TenantPlugin, { tenant: profile.tenant }
  end

end



