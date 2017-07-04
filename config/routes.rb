Rails.application.routes.draw do
  root to: 'pages#home'
  # The controller part tells devise we need to edit some of it's functionality
  devise_for :users, controllers: { registrations: 'users/registrations' }
  
  resources :users do
    resource :profile
  end
  
  get 'about', to: 'pages#about'
  # "Resources" is a short way to include all 7 possible routes
  # "Only" limits the resources to a particular route
  resources :contacts, only: :create 

  # Custom URLS 
  # 'as' is a prefix to the particular directory  
  get 'contact-us', to: 'contacts#new' , as: 'new_contact'
end