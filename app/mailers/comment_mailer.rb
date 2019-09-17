class CommentMailer < ApplicationMailer

    def new_comment params 
      @email = params[:email]
      @commentable = params[:commentable]
      mail(to: @email)
    end  
  end
  