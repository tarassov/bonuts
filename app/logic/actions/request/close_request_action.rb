class CloseRequestAction < BaseAction
    def effected_profiles
        @profiles ||= []
      end
    
      protected
    
      def do_call
        request = @args[:asset]
        @profile = @args[:profile]
        if request
          if request.status == 2
            errors.add :not_changed, 'Already closed'
            return
          end
          request.status = 2
          request.date_used = DateTime.current
          deal = Deal.create({ profile: @profile, comment: nil, deal_type: 'close_request' })
          request.deals << deal
          result = request.save!
          unless result
            errors.add :not_changed, 'Something went wrong'
            return
          end
          effected_profiles << request.profile
        else
          errors.add :not_found, 'Request not found'
          return
        end
        request
      end
end
  
   