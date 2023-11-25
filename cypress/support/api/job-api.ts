import { URLS } from "../helpers/const-helper"
import { initJob } from "../init/init-job"
import { initDeletePaylod } from "../init/init-delete"
import jobInterface from "../interface/job-interface"

const JOB_API_URL = URLS.job

export const createJobAPI = (job: jobInterface) => {
    return new Cypress.Promise((resolve) => {
        let jobPaylad = initJob(job)
        cy.orangeAPI('POST', JOB_API_URL, jobPaylad).then((response) => {
            resolve(response.data.id)
            cy.log('**Add New Job**')
        })
    })
}

export const deleteJob = (id: number) => {
    let paylod = initDeletePaylod(id)
    cy.orangeAPI('DELETE', JOB_API_URL, paylod).then(() => {
        cy.log('**Delete New Jobs**')
    })
}


