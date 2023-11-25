import { URLS } from "../helpers/const-helper";
import typeInterface from "../interface/type-interface";
import { initType } from "../init/init-event";
import { initDeletePaylod } from "../init/init-delete";

const EVENT_API_URL = URLS.event;

export default class Event {
  static createEvent(event: typeInterface) {
    return new Cypress.Promise((resolve) => {
      cy.orangeAPI("POST", EVENT_API_URL, initType(event)).then((response) => {
        resolve(response.data.id);
        cy.log("**Add New Event**");
      });
    });
  }

  static deleteEvent(id: number) {
    cy.orangeAPI("DELETE", EVENT_API_URL, initDeletePaylod(id)).then((response) => {
      cy.log("**DELETE New Event**");
    });
  }
}
