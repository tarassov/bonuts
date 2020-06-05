# frozen_string_literal: true

class CommentMailer < ApplicationMailer
  def new_comment(params)
    @email = params[:email]
    @comment = params[:comment]
    @commentable = params[:commentable]
    @url = params[:url]
    mail(to: @email, subject: 'Новый комментарий в пончиках')
  end
  end
