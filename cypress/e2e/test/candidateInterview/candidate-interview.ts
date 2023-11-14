import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../../support/pageObject/login-page";
import EmployeeAPI from "../../../support/api/employee-api";
import candidatePage from "../../../support/pageObject/candidate-page";
import { createJobAPI, deleteJob } from "../../../support/api/job-api";
import employeeInterface from "../../../support/interface/employee-interface";
import {
  createVacancyAPI,
  deleteVacancyAPI,
} from "../../../support/api/vacany-api";
import vacancyInterface from "../../../support/interface/vacancy-interface";
import {
  createCandidateAPI,
  deleteCandidateAPI,
  sechualInterviewCandidateAPI,
  shortListCandidateAPI,
} from "../../../support/api/candidate-api";

const login: LoginPage = new LoginPage();
const empAPI: EmployeeAPI = new EmployeeAPI();
const candidate: candidatePage = new candidatePage();

let jobId: any;
let empNum: any;
let vacancyId: any;
let candidateId: any;

Given("The system has existing Job", () => {
  cy.visit("/web/index.php");
  cy.fixture("adminLogin").then((admin) => {
    login.userLogin(admin.userName, admin.password);
    login.verfiyElem(admin.dashboard_main_menu_item);
  });

  cy.fixture("job").then((job) => {
    createJobAPI(job).then((resolve) => {
      jobId = resolve;
    });
  });
});

Given("Existing Employee", () => {
  cy.fixture("employees").then((employees: employeeInterface[]) => {
    let emp = employees[0];
    empAPI.addEmployee(emp).then((resolve) => {
      empNum = resolve;
    });
  });
});

Given("Existing Vacancy with hiring existing employee", () => {
  cy.fixture("vacancy").then((vacancy: vacancyInterface) => {
    createVacancyAPI(vacancy, empNum, jobId).then((resolve) => {
      vacancyId = resolve;
    });
  });
});

Given("Existing candidate with Interview Scheduled status", () => {
  cy.fixture("candidate").then((candidate) => {
    createCandidateAPI(candidate, vacancyId).then((resolve) => {
      candidateId = resolve;
      shortListCandidateAPI(candidateId);
      cy.fixture("interview").then((interview) => {
        sechualInterviewCandidateAPI(candidateId, interview, [empNum]);
      });
    });
  });
  login.userLogout();
});

When("The admin login to the system", () => {
  cy.fixture("adminLogin").then((admin) => {
    login.userLogin(admin.userName, admin.password);
    login.verfiyElem(admin.dashboard_main_menu_item);
  });
});

When("Access the candidate form", () => {
  candidate.visitCandidate(candidateId);
});

When("Click on Passe the Interview button", () => {
  candidate.visitCandidate(candidateId);
  candidate.passInterview();
});

Then("The Interview should contain the Passed Interview status", () => {
  candidate.verfiyInterviewPassed();
});

When("Click on Fail the Interview button", () => {
  candidate.visitCandidate(candidateId);
  candidate.failInterview();
});

Then("The Interview should contain the Failed Interview status", () => {
  candidate.verfiyInterviewFailed();
});

Then("Delete all PreRequisites data", () => {
  deleteCandidateAPI(candidateId);
  deleteVacancyAPI(vacancyId);
  empAPI.deleteEmployee(empNum);
  deleteJob(jobId);
});
