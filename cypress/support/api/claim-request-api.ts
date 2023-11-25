import { URLS } from "../helpers/const-helper";
import { initClaimRequest } from "../init/init-claim-request";
import ExpenseRequest from "./expens-api";

const CLIAM_REQUEST_API_URL = URLS.cliamReq;

export default class ClaimRequest {
  static createClaimRequest(
    eventID: number,
    expenseID: number,
    claim: { currencyId: string; amount: string; date: string }
  ) {
    return new Cypress.Promise((resolve) => {
      cy.orangeAPI(
        "POST",
        CLIAM_REQUEST_API_URL,
        initClaimRequest(eventID, claim.currencyId)
      ).then((response) => {
        resolve(response.data.id);
        let cliamID = response.data.id;
        ExpenseRequest.createExpenseRequest(
          cliamID,
          expenseID,
          claim.amount,
          claim.date
        );
        this.submitClaimRequest(cliamID);
        cy.log("**Add Cliam Request**");
      });
    });
  }

  static submitClaimRequest(id: number) {
    let payload = {
      action: "SUBMIT",
    };
    cy.orangeAPI("PUT", `${CLIAM_REQUEST_API_URL}/${id}/action`, payload).then(
      () => {
        cy.log("**Submit Cliam Request**");
      }
    );
  }
}
