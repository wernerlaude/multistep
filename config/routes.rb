Rails.application.routes.draw do
  get "survey_responses/new"
  get "survey_responses/create"

  resources :survey_responses, only: [:new, :create, :show] do
    collection do
      get :thank_you
    end
  end
  root "survey_responses#new"
end
