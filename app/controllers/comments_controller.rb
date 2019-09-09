class CommentsController < ApiController
    before_action :find_commentable, only: :create
    
        def new
          @comment = Comment.new
        end
    
        def create
          if check_tenant(@commentable)  
            comment = Comment.new({:text =>comment_params[:text],:profile_id => @current_profile.id})
            @commentable.comments << comment
            if comment.save!
                json_response  @serializer.new(@commentable,{params: {include_comments: true, profile:  @current_profile}}).serialized_json
             end
          end  
        end

      
        private
    
        def comment_params
          params.permit(:text,:event_id)
        end
    
        def find_commentable
           if params[:event_id]
             @commentable = Event.find_by_id(params[:event_id])
             @serializer = EventSerializer
           end
         end

        #def find_commenter
        #    @klass = params[:commentable_type].capitalize.constantize
        #    @serializer = (params[:commentable_type].capitalize + 'Serializer').constantize
        #    @commenter = klass.find(params[:commentable_id])
        #  end
    
    end