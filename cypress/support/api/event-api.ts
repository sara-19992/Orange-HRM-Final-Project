import { URLS } from "../helpers/const-helper"
import typeInterface from "../interface/type-interface"
import { initType } from "../init/init-event"
import { initDeletePaylod } from "../init/init-delete"

const EVENT_API_URL = URLS.event

export const createEvent = (event: typeInterface) => {
    return new Cypress.Promise((resolve) => {
        let payload = initType(event)
        cy.orangeAPI('POST', EVENT_API_URL, payload).then((response) => {
            resolve(response.data.id)
            cy.log('**Add New Event**')
        })
    })
}

export const deleteEvent = (id: number) => {
    let payload = initDeletePaylod(id)
    cy.orangeAPI('DELETE', EVENT_API_URL, payload).then((response) => {
        cy.log('**DELETE New Event**')
    })
}
