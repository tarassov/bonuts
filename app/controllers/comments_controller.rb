class CommentsController < ApiController
    before_action :find_commenter, only: :create
    
        def new
          @comment = Comment.new
        end
    
        def create
          if check_tenant(@commenter)  
            @commenter.comments.build(comment_params)
            @commenter.save
          end  
        end
    
        private
    
        def comment_params
          params.require(:comment).permit(:text)
        end
    
        # def find_commentable
        #   if params[:comment_id]
        #     @commentable = Comment.find_by_id(params[:comment_id]) 
        #   elsif params[:event_id]
        #     @commentable = Event.find_by_id(params[:event_id])
        #   end
        # end

        def find_commenter
            @klass = params[:commenter_type].capitalize.constantize
            @commenter = klass.find(params[:commenter_id])
          end
    
    end