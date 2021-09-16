# frozen_string_literal: true

class TenantAbility < BaseAbility
  
   
    def admin_abilities profile
      can :show_current, :all
      can :administrate, Tenant, id: profile.tenant.id
    end

    def user_abilities profile
      #  can :manage, :all        
    end

    def visitor_abilities user
        can :read, :all        
    end

    
  end
  