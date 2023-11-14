Feature: Verification Upload a txt File For Candidate

  Scenario: Verify Upload a txt file for Candidate with Application Initiated status.
    Given The system has existing Job
    Given Existing Employee
    Given Existing Vacancy For existing employee hiring
    Given Existing candidate with Application Initiated status
    When The admin login to the system
    When Access the candidate form
    When Click on edit mode
    When Uplode a txt file
    Then The uploaded file should contain the same data as was uploaded
    Then Delete all PreRequisites data

  Scenario: Verify Upload a txt file for Candidate with Hired status.
    Given The system has existing Job
    Given Existing Employee
    Given Existing Vacancy For existing employee hiring
    Given Existing candidate with hired status
    When The admin login to the system
    When Access the candidate form
    When Click on edit mode
    When Uplode a txt file
    Then The uploaded file should contain the same data as was uploaded
    Then Delete all PreRequisites data
