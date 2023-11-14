import { URLS } from "../helpers/const-helper"
import { initDeletePaylod } from "../init/init-delete"
import { initVacancy } from "../init/init-vacancy"
import vacancyInterface from "../interface/vacancy-interface"

const VACANCY_API_URL = URLS.vacancy

export const createVacancyAPI = (vacancy: vacancyInterface, employeeId: number, jobId: number) => {
    return new Cypress.Promise((resolve) => {
        let payload = initVacancy(vacancy, employeeId, jobId)
        cy.orangeAPI('POST', VACANCY_API_URL, payload).then((response) => {
            cy.log('**Add New Vacancy With Hireing New Employee**')
            resolve(response.data.id)
        })
    })
}

export const deleteVacancyAPI = (id: number) => {
    let payload = initDeletePaylod(id);
    cy.orangeAPI("DELETE", VACANCY_API_URL, payload).then(() => {
      cy.log("**DELETE New Vacancy**");
    });
  };