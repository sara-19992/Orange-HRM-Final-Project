Feature:Candidate Interview Result Verification Pass/Fail

  Scenario: Passed Candidate Interviwe
    Given The admin login to the system
    When Access the candidate form
    And Click on Passe the Interview button
    Then The Interview should contain the Passed Interview status

  Scenario: Failed Candidate Interviwe
    Given The admin login to the system
    When Access the candidate form
    And Click on Fail the Interview button
    Then The Interview should contain the Failed Interview status
