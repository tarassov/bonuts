class InviteUserAction < BaseAction
    def user
        return @user
      end
  
      def result_event
          @user
      end
      
      protected
      def do_call        
          @demo = @args[:tenant].demo
       
          @user = User.where(email: @args[:email], demo:  @demo).first
          
          unless @user
            @user = User.create!({email: @args[:email], password: @args[:password], first_name: @args[:first_name], last_name:  @args[:last_name]})      
          end
         
          @Invitation = Invitation.create!({user: @user, tenant: @args[:tenant], from_user: @args[:profile].user})
      
          @user.demo = @demo
          @user.active  = @demo
          @user.email_confirmed = @demo
        
          @user.save
  
        
          return @user 
      end
end
  
   