Rails.application.routes.draw do

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  scope '/api' do
    post 'register', to: 'users#register'

    post 'validate_new_email', to: 'users#validate_new_email'

    post 'authenticate', to: 'authentication#authenticate'

    post '/confirm_email', :to => "users#confirm_email", as: 'confirm_email'

    get '/confirm_email', :to => "users#show_by_token"

    get '/users/recover/', :to => "users#show_by_recover"

    get 'profile',  to: 'profiles#show'

    put 'profile',  to: 'users#update_current'

    put '/users/password', to:  'users#recover_password'
    post '/users/password', to: 'users#update_password'

    resources  :self_accounts, only: [:show]
    resources  :distrib_accounts, only: [:show]
    resources :users, only: [:index]
    resources :account_operations, only: [:create]
    resources :profiles, only: [:index]
    resources :donuts
    resources :events, only: [:index]
    resources :profile_assets, only: [:create]
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
