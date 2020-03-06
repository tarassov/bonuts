class CommentMailer < ApplicationMailer

    def new_comment params 
      @email = params[:email]
      @commentable = params[:commentable]
      @event_url = params[:event_url]
      mail(to: @email)
    end  
  end
  