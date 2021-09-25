class CreateInvitationAction < BaseAction
    attr_reader :user
  
    def result_event
      @invitation
    end
  
    protected
  
    def do_call
      tenant = @args[:tenant]
      @demo = tenant.demo
      profile  = @args[:profile]  
      # find user if user exists
      @user = User.where(email: @args[:email], demo: @demo).first
  
      # check in any invitation exsts
      if @user && Invitation.exists?(user: @user, tenant: tenant, activated: false)
        errors.add :error, I18n.t('invitation.invitation_exists')
        return @user
      end
  
      deal = Deal.create({ profile: @args[:profile], comment: 'welcome', deal_type: 'new_invitation' })
  
      # create new user if no user exists
      @user ||= User.create!({ email: @args[:email], password: User.generate_password,
                               first_name: @args[:first_name], last_name: @args[:last_name], active: true })
      @user.set_recover_token 
  
      # create invitation
      @invitation = Invitation.create!({ user: @user, tenant: tenant, from_user: profile.user,
                                         activated: false })
  
      # add deal to invitation entity stack
      @invitation.deals << deal
  
      @user.demo = @demo
      @user.active = @demo
      @user.email_confirmed = @demo
  
      @user.save
  
      @invitation
    end
  end
  