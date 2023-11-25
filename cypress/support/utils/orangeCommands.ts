import responseInterface from "../interface/response-interface";

declare global {
    namespace Cypress {
        interface Chainable {
            orangeAPI: (method: string, url: string, payload: {}) => Chainable<responseInterface>
            getByPlaceholder(field: string): Chainable<any>;


        }
    }
}

function getByPlaceholder(field: string) {
    return cy.get('[placeholder="' + field + '"]');
}

function orangeAPI(method: string, url: string, payload: {}) {
    return cy.request({
        method: method,
        url: url,
        body: payload
    }).its('body')
}

Cypress.Commands.add('getByPlaceholder', getByPlaceholder);

Cypress.Commands.add('orangeAPI', orangeAPI);

