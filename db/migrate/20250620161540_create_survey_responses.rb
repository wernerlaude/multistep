class CreateSurveyResponses < ActiveRecord::Migration[8.0]
  def change
    create_table :survey_responses do |t|
      t.string :step1
      t.string :step2
      t.string :step3
      t.string :step4
      t.string :step5
      t.string :step6
      t.string :step7
      t.string :name
      t.string :email

      t.timestamps
    end
  end
end
