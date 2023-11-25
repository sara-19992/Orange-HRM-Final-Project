import { URLS } from "../helpers/const-helper";
import typeInterface from "../interface/type-interface";
import { initType } from "../init/init-event";
import { initDeletePaylod } from "../init/init-delete";
import { initExpenseReq } from "../init/init-expense-request";

const EXPENSE_API_URL = URLS.expense;
const CLIAM_REQUEST_API_URL = URLS.cliamReq;

export default class ExpenseType {
  static createExpenseType(expens: typeInterface) {
    return new Cypress.Promise((resolve) => {
      cy.orangeAPI("POST", EXPENSE_API_URL, initType(expens)).then((response) => {
        resolve(response.data.id);
        cy.log("**Add New Expense Type**");
      });
    });
  }
  
  static createExpenseRequest(
    cliamID: number,
    id: number,
    amount: string,
    date: string
  ) {
    cy.orangeAPI(
      "POST",
      `${CLIAM_REQUEST_API_URL}/${cliamID}/expenses`,
      initExpenseReq(id, amount, date)
    ).then(() => {
      cy.log("**Add New Expense Request**");
    });
  }

  static deleteExpenseType(id: number) {
    cy.orangeAPI("DELETE", EXPENSE_API_URL, initDeletePaylod(id)).then(() => {
      cy.log("**DELETE New Expense Type**");
    });
  }
}
