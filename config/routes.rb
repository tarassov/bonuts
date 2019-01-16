Rails.application.routes.draw do

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  scope '/api' do
    post 'register', to: 'users#register'

    post 'validate_new_email', to: 'users#validate_new_email'

    post 'authenticate', to: 'authentication#authenticate'

    get 'profile',  to: 'users#show_current'

    put 'profile',  to: 'users#update_current'

    resources  :self_accounts, only: [:show]
    resources  :distrib_accounts, only: [:show]
    resources :users, only: [:index]
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
