import { URLS } from "../helpers/const-helper"
import { initLocation } from "../init/init-location"
import { initDeletePaylod } from "../init/init-delete"
import locationInterface from "../interface/location-interface"

const LOCATION_API_URL = URLS.location
export default class LocationAPI{
    static createLocation(location: locationInterface){
        return new Cypress.Promise((resolve) => {
            cy.orangeAPI('POST', LOCATION_API_URL, initLocation(location)).then((response) => {
                cy.log('**Add New Location**')
                resolve(response.data.id)
            })
        })
    }
    
    static deleteLocation(id: number){
        cy.orangeAPI('DELETE', LOCATION_API_URL, initDeletePaylod(id)).then(() => {
            cy.log('**Delete New Location**')
        })
    }
}



