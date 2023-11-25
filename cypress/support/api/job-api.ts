import { URLS } from "../helpers/const-helper";
import { initJob } from "../init/init-job";
import { initDeletePaylod } from "../init/init-delete";
import jobInterface from "../interface/job-interface";

const JOB_API_URL = URLS.job;

export default class JobAPI {
  static createJobAPI(job: jobInterface) {
    return new Cypress.Promise((resolve) => {
      cy.orangeAPI("POST", JOB_API_URL, initJob(job)).then((response) => {
        resolve(response.data.id);
        cy.log("**Add New Job**");
      });
    });
  }

  static deleteJob(id: number) {
    cy.orangeAPI("DELETE", JOB_API_URL, initDeletePaylod(id)).then(() => {
      cy.log("**Delete New Jobs**");
    });
  }
}
