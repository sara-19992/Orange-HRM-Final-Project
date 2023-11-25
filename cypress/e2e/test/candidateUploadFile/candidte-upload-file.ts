import { Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../../support/pageObject/login-page";
import EmployeeAPI from "../../../support/api/employee-api";
import candidatePage from "../../../support/pageObject/candidate-page";
import { createJobAPI, deleteJob } from "../../../support/api/job-api";
import employeeInterface from "../../../support/interface/employee-interface";
import { createVacancyAPI, deleteVacancyAPI } from "../../../support/api/vacany-api";
import vacancyInterface from "../../../support/interface/vacancy-interface";
import {
  createCandidateAPI,
  deleteCandidateAPI,
  hiredCandidateAPI,
  offerJobCandidateAPI,
  passInterviewCandidate,
  sechualInterviewCandidateAPI,
  shortListCandidateAPI,
} from "../../../support/api/candidate-api";

const login: LoginPage = new LoginPage();
const empAPI: EmployeeAPI = new EmployeeAPI();
const candidate: candidatePage = new candidatePage();

let jobId: any;
let empNum: any;
let vacancyId: any;
let vacancyName: any;
let candidateId: any;

beforeEach(() => {
  cy.visit("/web/index.php");
  cy.fixture("adminLogin").then((admin) => {
    login.userLogin(admin.userName, admin.password);
  });

  //The system has existing Job
  cy.fixture("job").then((job) => {
    createJobAPI(job).then((resolve) => {
      jobId = resolve;
    });
  });

  //Existing Employee
  cy.fixture("employees").then((employees: employeeInterface[]) => {
    let emp = employees[0];
    empAPI.addEmployee(emp).then((resolve) => {
      empNum = resolve;
    });
  });

  //Existing Vacancy with hiring existing employee
  cy.fixture("vacancy").then((vacancy: vacancyInterface) => {
    createVacancyAPI(vacancy, empNum, jobId).then((resolve) => {
      vacancyName = vacancy.name;
      vacancyId = resolve;
    });
  });
})

afterEach(() => {
  deleteCandidateAPI(candidateId);
  deleteVacancyAPI(vacancyId);
  empAPI.deleteEmployee(empNum);
  deleteJob(jobId);
})

Given("Existing candidate with Application Initiated status", () => {
  cy.fixture("candidate").then((cand) => {
    createCandidateAPI(cand, vacancyId).then((resolve) => {
      candidateId = resolve;
    });
  });
  login.userLogout();
});

Given("Existing candidate with hired status", () => {
  cy.fixture("candidate").then((cand) => {
    createCandidateAPI(cand, vacancyId).then((resolve) => {
      candidateId = resolve;
      shortListCandidateAPI(candidateId);
      cy.fixture("interview").then((interview) => {
        sechualInterviewCandidateAPI(candidateId, interview, [empNum]).then(
          (resolve) => {
            let id: any = resolve;
            passInterviewCandidate(candidateId, id);
          }
        );
      });
      offerJobCandidateAPI(candidateId);
      hiredCandidateAPI(candidateId);
    });
  });
  login.userLogout();
});

Given("The admin login to the system", () => {
  cy.fixture("adminLogin").then((admin) => {
    login.userLogin(admin.userName, admin.password);
    login.verfiyElem(admin.dashboard_main_menu_item);
  });
});

When("Access the candidate form", () => {
  candidate.goToRecruitment();
  candidate.visitCandidateForm(vacancyName);
});

When("Click on edit mode", () => {
  candidate.editCandidateMode();
});

When("Uplode a txt file", () => {
  candidate.uploadCandidateFIle();
});

Then("The uploaded file should contain the same data as was uploaded", () => {
  let fileName = "file.txt";
  candidate.verfiyCandidateFile(fileName);
});
