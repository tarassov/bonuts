# frozen_string_literal: true

class ProfileAssetAbility < BaseAbility
  
      
    def admin_abilities profile
      can :manage, ProfileAsset, tenant: profile.tenant
      can :create, ProfileAsset
    end

    def store_admin_abilities profile
      can :manage, ProfileAsset, tenant: profile.tenant
      can :create, ProfileAsset
    end

    def user_abilities(profile)
        can :read, ProfileAsset, tenant: profile.tenant
    end

    def member_abilities(profile)
        can :read, Donut, tenant: profile.tenant
    end

    
  end
  