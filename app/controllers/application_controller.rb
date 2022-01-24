# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def fallback_index_html
    render file:  Rails.root.join('public/index.html')
  end
end
