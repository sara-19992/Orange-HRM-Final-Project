import { URLS } from "../helpers/const-helper"
import typeInterface from "../interface/type-interface"
import { initType } from "../init/init-event"
import { initDeletePaylod } from "../init/init-delete"
import { initExpenseReq } from "../init/init-expense-request"

const EXPENSE_API_URL = URLS.expense
const CLIAM_REQUEST_API_URL = URLS.cliamReq


export const createExpenseType = (expens: typeInterface) => {
    return new Cypress.Promise((resolve) => {
        let payload = initType(expens)
        cy.orangeAPI('POST', EXPENSE_API_URL, payload).then((response) => {
            resolve(response.data.id)
            cy.log('**Add New Expense Type**')
        })
    })
}

export const createExpenseRequest = (cliamID: number, id: number, amount: string, date: string) => {
    let payload = initExpenseReq(id, amount, date)
    cy.orangeAPI('POST', `${CLIAM_REQUEST_API_URL}/${cliamID}/expenses`, payload).then(() => {
        cy.log('**Add New Expense Request**')
    })
}

export const deleteExpenseType = (id: number) => {
    let payload = initDeletePaylod(id)
    cy.orangeAPI('DELETE', EXPENSE_API_URL, payload).then(() => {
        cy.log('**DELETE New Expense Type**')
    })
}
