Rails.application.routes.draw do

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  scope '/api' do
    post 'register', to: 'users#register'

    post 'validate_new_email', to: 'users#validate_new_email'

    post 'authenticate', to: 'authentication#authenticate'

    post '/confirm_email', :to => "users#confirm_email", as: 'confirm_email'

    get '/confirm_email/:token', :to => "users#show_by_token"

    get 'profile',  to: 'users#show_current'

    put 'profile',  to: 'users#update_current'

    resources  :self_accounts, only: [:show]
    resources  :distrib_accounts, only: [:show]
    resources :users, only: [:index]
    resources :account_operations, only: [:create]

    resources :events, only: [:index]
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
