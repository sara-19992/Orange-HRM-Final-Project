Feature:Candidate Interview Result Verification Pass/Fail

  Scenario: Passed Candidate Interviwe
    Given The system has existing Job
    Given Existing Employee
    Given Existing Vacancy with hiring existing employee
    Given Existing candidate with Interview Scheduled status
    When The admin login to the system
    When Access the candidate form
    When Click on Passe the Interview button
    Then The Interview should contain the Passed Interview status
    Then Delete all PreRequisites data  

  Scenario: Failed Candidate Interviwe
    Given The system has existing Job
    Given Existing Employee
    Given Existing Vacancy with hiring existing employee
    Given Existing candidate with Interview Scheduled status
    When The admin login to the system
    When Access the candidate form
    When Click on Fail the Interview button
    Then The Interview should contain the Failed Interview status
    Then Delete all PreRequisites data 
