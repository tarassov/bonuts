# frozen_string_literal: true

class RequestAbility < BaseAbility
  
      
    def admin_abilities profile
      can :manage, Request, tenant: profile.tenant
      can :create, Request
    end

    def store_admin_abilities profile
      can :manage, Request, tenant: profile.tenant
      can :create, Request
    end

    def user_abilities(profile)
        can :read, Request, tenant: profile.tenant
    end

    def member_abilities(profile)
        can :read, Donut, tenant: profile.tenant
    end

    
  end
  