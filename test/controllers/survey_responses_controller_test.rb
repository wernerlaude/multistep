require "test_helper"

class SurveyResponsesControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get survey_responses_new_url
    assert_response :success
  end

  test "should get create" do
    get survey_responses_create_url
    assert_response :success
  end
end
