import { URLS } from "../helpers/const-helper";
import {
  clickOnButton,
  clickOnSubmitButton,
  selectFromList,
  uploadFile,
  verfiyElementHaveLength,
  verfiyElementHaveText,
  verfiyFileEqual,
  verfiyFileIsExist,
} from "../helpers/generic-helper";

const CANDIDATE_VISIT_URL = URLS.visitCandidate;

export default class candidatePage {
  elements = {
    MainMenuItems: () => cy.get(".oxd-sidepanel-body"),
    buttons: () => cy.get("button[type=button]"),
    submitBut: () => cy.get("button[type=submit]"),
    status: () => cy.get(".orangehrm-recruitment-status"),
    selectInput: () => cy.get(".oxd-input-group"),
    eyeIcon: () => cy.get(".bi-eye-fill"),
    switchEdit: () => cy.get(".oxd-switch-input"),
    uploadFileInput: () => cy.get('input[type="file"]'),
    resume: () => cy.get(".orangehrm-file-preview"),
    attachmentRows: () => cy.get(".oxd-table-card"),
    downlodeIconFile: () => cy.get(".bi-download"),
    loader: () => cy.get(".oxd-loading-spinner"),
    tableRow: () => cy.get(".oxd-table-card"),
    actionButs: () => cy.get(".orangehrm-recruitment-actions"),
  };

  goToRecruitment() {
    clickOnButton(this.elements.MainMenuItems().contains("Recruitment"));
  }

  visitCandidate(id: number) {
    cy.visit(`${CANDIDATE_VISIT_URL}/${id}`);
  }

  visitCandidateForm(vacancy: string) {
    selectFromList({
      element: this.elements
        .selectInput()
        .contains(".oxd-input-group", "Vacancy")
        .find(".oxd-select-wrapper"),
      select: vacancy,
    });
    clickOnButton(this.elements.submitBut());
    this.verfiyLoaderIsNotExist();
    verfiyElementHaveLength(this.elements.tableRow(), 1);
    clickOnButton(this.elements.eyeIcon());
  }

  editCandidateMode() {
    this.elements.switchEdit().click({ force: true });
  }

  uploadCandidateFIle() {
    uploadFile(this.elements.uploadFileInput(), "cypress/fixtures/file.txt");
    clickOnButton(this.elements.submitBut());
    this.verfiyLoaderIsNotExist();
  }

  verfiyCandidateFile(fileName: string) {
    verfiyElementHaveText(this.elements.resume(), `${fileName} `);
    clickOnButton(this.elements.downlodeIconFile());
    verfiyFileIsExist(fileName);
    verfiyFileEqual(fileName);
  }

  clickOnPassInterviewButton() {
    this.interviewAction("Mark Interview Passed");
  }

  clickOnFailInterviewButton() {
    this.interviewAction("Mark Interview Failed");
  }

  interviewAction(str: string) {
    this.verfiyLoaderIsNotExist()
    this.verfiyCandidateButtonsIsExist(
      "Reject Mark Interview Failed Mark Interview Passed"
    );
    clickOnButton(this.elements.buttons().contains(str));
    clickOnSubmitButton(this.elements.submitBut());
    }

  verifyInterviewPassedStatusIsExist() {
    this.verfiyCandidateStatus("Interview Passed");
    this.verfiyCandidateButtonsIsExist("Reject Schedule Interview Offer Job");
  }

  verifyInterviewFailedStatusIsExist() {
    this.verfiyCandidateStatus("Interview Failed");
    this.verfiyCandidateButtonsIsExist("Reject");
  }

  verfiyCandidateStatus(status: string) {
    this.elements.status().should("contain", status);
  }

  verfiyCandidateButtonsIsExist(buts: string) {
    this.elements.actionButs().contains(buts);
  }

  verfiyLoaderIsNotExist() {
    this.elements.loader().should("not.exist");
  }
}
