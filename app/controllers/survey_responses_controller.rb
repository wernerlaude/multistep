# app/controllers/survey_responses_controller.rb
class SurveyResponsesController < ApplicationController
  def new
    @survey_response = SurveyResponse.new
  end

  def create
    @survey_response = SurveyResponse.new(survey_response_params)
    if @survey_response.save
      redirect_to thank_you_survey_responses_path
    else
      render :new
    end
  end
  def show
    @survey_response = SurveyResponse.find(params[:id])
  end

  private

  def survey_response_params
    params.require(:survey_response).permit(:step1, :step2, :step3, :step4, :step5, :step6, :step7, :name, :email)
  end
end
