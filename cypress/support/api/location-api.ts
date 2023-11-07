import { URLS } from "../helpers/const-helper"
import { initLocation } from "../init/init-location"
import { initDeletePaylod } from "../init/init-delete"
import locationInterface from "../interface/location-interface"

const LOCATION_API_URL = URLS.location
export const createLocationAPI = (location: locationInterface) => {
    return new Cypress.Promise((resolve) => {
        let locationPaylad = initLocation(location)
        cy.orangeAPI('POST', LOCATION_API_URL, locationPaylad).then((response) => {
            cy.log('**Add New Location**')
            resolve(response.data.id)
        })
    })
}

export const deleteLocation = (id: number) => {
    let paylod = initDeletePaylod(id)
    cy.orangeAPI('DELETE', LOCATION_API_URL, paylod).then(() => {
        cy.log('**Delete New Location**')
    })
}


