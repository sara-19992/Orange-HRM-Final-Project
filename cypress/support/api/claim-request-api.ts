import { URLS } from "../helpers/const-helper"
import { initClaimRequest } from "../init/init-claim-request"
import { createExpenseRequest } from "./expens-api"

const CLIAM_REQUEST_API_URL = URLS.cliamReq


export const createClaimRequest = (eventID: number, expenseID: number, claim: { currencyId: string, amount: string, date: string }) => {
    return new Cypress.Promise((resolve) => {

        let payload = initClaimRequest(eventID, claim.currencyId)
        cy.orangeAPI('POST', CLIAM_REQUEST_API_URL, payload).then((response) => {
            resolve(response.data.id)
            let cliamID = response.data.id
            createExpenseRequest(cliamID, expenseID, claim.amount, claim.date)
            submitClaimRequest(cliamID)
            cy.log('**Add Cliam Request**')
        })
    })
}

export const submitClaimRequest = (id: number) => {
    let payload = {
        action: "SUBMIT"
    }
    cy.orangeAPI('PUT', `${CLIAM_REQUEST_API_URL}/${id}/action`, payload).then(() => {
        cy.log('**Submit Cliam Request**')
    })
}