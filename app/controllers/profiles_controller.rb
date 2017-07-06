class ProfilesController < ApplicationController
  def new
    # render black profile details form
    @profile = Profile.new
  end    
end