import { URLS } from "../helpers/const-helper";
import { initCandidate } from "../init/init-candidate";
import { initDeletePaylod } from "../init/init-delete";
import { initInterview } from "../init/init-interview";
import { candidateInterface } from "../interface/candidate-interface";
import interiewInterface from "../interface/interview-interface";

const CANDIDATE_API_URL = URLS.candidate;

export const createCandidateAPI = (
  candidate: candidateInterface,
  vacancyId: number
) => {
  return new Cypress.Promise((resolve) => {
    let payload = initCandidate(candidate, vacancyId);
    cy.orangeAPI("POST", CANDIDATE_API_URL, payload).then((response) => {
      resolve(response.data.id);
      cy.log("**Add New Candidate**");
    });
  });
};

export const deleteCandidateAPI = (id: number) => {
  let payload = initDeletePaylod(id);
  cy.orangeAPI("DELETE", CANDIDATE_API_URL, payload).then(() => {
    cy.log("**DELETE New Candidate**");
  });
};

export const shortListCandidateAPI = (id: number) => {
  let payload = { note: null };
  cy.orangeAPI("PUT", `${CANDIDATE_API_URL}/${id}/shortlist`, payload).then(
    () => {
      cy.log("**Short List a Candidate**");
    }
  );
};

export const sechualInterviewCandidateAPI = (
  id: number,
  interview: interiewInterface,
  interviewerEmpNumbers: number[]
) => {
  return new Cypress.Promise((resolve) => {
    let payload = initInterview(interview, interviewerEmpNumbers);
    cy.orangeAPI(
      "POST",
      `${CANDIDATE_API_URL}/${id}/shedule-interview`,
      payload
    ).then((response) => {
      resolve(response.data.id);
      cy.log("**Shedule Interview a Candidate**");
    });
  })
  
};

export const passInterviewCandidate = (id: number,interviewId:number) => {
  let payload = { note: null };
  cy.orangeAPI("PUT", `${CANDIDATE_API_URL}/${id}/interviews/${interviewId}/pass`, payload).then(() => {
    cy.log("**Pass Interview for a Candidate**");
  });
};

export const offerJobCandidateAPI = (id: number) => {
  let payload = { note: null };
  cy.orangeAPI("PUT", `${CANDIDATE_API_URL}/${id}/job/offer`, payload).then(
    () => {
      cy.log("**Job offer for a Candidate**");
    }
  );
};

export const hiredCandidateAPI = (id: number) => {
  let payload = { note: null };
  cy.orangeAPI("PUT", `${CANDIDATE_API_URL}/${id}/hire`, payload).then(() => {
    cy.log("**Hired a Candidate**");
  });
};
