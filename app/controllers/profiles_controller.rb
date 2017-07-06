class ProfilesController < ApplicationController
  def new
    # render black profile details form
    @profile = Profile.new
  end
  
  #POST request
  def create 
    # Ensure that we have user wh is filling out form
    @user = User.find( params[:user_id] )
    # Create profile linked to specific user
    @profile = @user.build_profile(profile_params)
    if @profile.save
      flash[:success] = "Profile Updated"
      redirect_to user_path (params[:user_id])
    else
      render action: :new
    end  
  end 
  private 
    def profile_params
      params.require(:profile).permit(:first_name, :last_name, :job_title, :phone_number, :contact_email, :description)
    end  
end