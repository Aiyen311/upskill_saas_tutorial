class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  # Run this if it's on a devise controller
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  protected
    def configure_permitted_parameters
      
      # Whitelist certain fields so no hacker can add any additional info
      # and only we can process them
      devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:stripe_card_token, :email, :password, :password_confirmation) }
    end
end