import { URLS } from "../helpers/const-helper";
import { selectFromList, uploadFile, verfiyFileEqual } from "../helpers/generic-helper";
// const path = require("path");

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
    resume: () => cy.get('.orangehrm-file-preview'),
    attachmentRows: () => cy.get(".oxd-table-card"),
    downlodeIconFile: () => cy.get(".bi-download"),
    loader: () => cy.get(".oxd-loading-spinner"),
    tableRow:() => cy.get(".oxd-table-card"),
    actionButs: () => cy.get(".orangehrm-recruitment-actions")
  };

  goToRecruitment() {
    this.elements
      .MainMenuItems()
      .contains("Recruitment")
      .click({ force: true });
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
    this.elements.submitBut().click({ force: true });
    this.elements.loader().should("not.exist");
    this.elements.tableRow().should('have.length',1)
    this.elements.eyeIcon().click({ force: true });
  }

  editCandidateMode() {
    this.elements.switchEdit().click({ force: true });
  }

  uploadCandidateFIle() {
    uploadFile(this.elements.uploadFileInput(), "cypress/fixtures/file.txt");
    this.elements.submitBut().click({ force: true });
    this.elements.loader().should("not.exist");
  }

  verfiyCandidateFile(fileName:string){
    this.elements.resume().should('have.text',`${fileName} `) 
    this.elements.downlodeIconFile().click({ force: true });
    cy.wait(2000);
    verfiyFileEqual(fileName)
  }

  passInterview() {
    this.interviewAction("Mark Interview Passed");
  }

  failInterview() {
    this.interviewAction("Mark Interview Failed");
  }

  interviewAction(str: string) {
    this.elements.loader().should("not.exist");
    this.elements.actionButs().contains('Reject Mark Interview Failed Mark Interview Passed')
    this.elements.buttons().contains(str).click({ force: true });
    this.elements.submitBut().click();
  }

  verfiyInterviewPassed() {
    this.verfiyCandidateStatus("Interview Passed");
    this.elements.actionButs().contains('Reject Schedule Interview Offer Job')
  }

  verfiyInterviewFailed() {
    this.verfiyCandidateStatus("Interview Failed");
    this.elements.actionButs().contains('Reject')
  }

  verfiyCandidateStatus(status: string) {
    this.elements.status().should("contain", status);
  }

}
