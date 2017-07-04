class Users::RegistrationsController < Devise::RegistrationsController
  
  # Only do this when the user is signing up
  before_action :select_plan, only: :new
  
  # Extends the default Devisor behaviour so that
  # users who are signing up with the pro account is
  # saved with the special stripe function otherwise,
  # devise signs up as usual.
  
  def create
    # super inherits the create action and extends it
    super do |resource|
      # Check to see if there's a plan in URL
      if params[:plan]
        resource.plan_id = params[:plan];
        if resource.plan_id == 2
          # Saves the user with subscription 
          resource.save_with_subscription
        else
          resource.save
        end
      end
      
    end
    
  end
  
  
  private
    # Forces the user to select either one of the two plans if they 
    # decide to mess around with the url plans
    def select_plan
      # Do not do this while the user is selecting plan 1 or 2
      unless (params[:plan] == '1' || params[:plan] == '2')
        # Rediect the user to the homepage with a warning
        flash[:notice] = "Please select a membership plan to sign up."
        redirect_to root_url
      end
    end
end