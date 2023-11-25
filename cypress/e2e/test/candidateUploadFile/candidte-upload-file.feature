Feature: Verification Upload a txt File For Candidate

  Scenario: Verify Upload a txt file for Candidate with Application Initiated status.
    Given Existing candidate with Application Initiated status
    And The admin login to the system
    When Access the candidate form
    And Click on edit mode
    And Uplode a txt file
    Then The uploaded file should contain the same data as was uploaded

  Scenario: Verify Upload a txt file for Candidate with Hired status.
    Given Existing candidate with hired status
    And The admin login to the system
    When Access the candidate form
    And Click on edit mode
    And Uplode a txt file
    Then The uploaded file should contain the same data as was uploaded
