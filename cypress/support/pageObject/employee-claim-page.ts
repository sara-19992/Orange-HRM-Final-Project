import { clickOnButton, clickOnSubmitButton, selectFromList } from "../helpers/generic-helper"

export default class employeeClaimPage {
    elements = {
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
        searchItem: () => cy.get('.oxd-grid-item '),
        searchBut: () => cy.get('button[type="submit"]'),
        claimRows: () => cy.get('.oxd-table-row'),
        buttons: () => cy.get('button[type="button"]'),
        inputGroup: () => cy.get('.oxd-input-group'),
    }

    goToEmoClaim() {
        clickOnButton(this.elements.MainMenuItems().contains('Claim'))
    }

    searchByEvent(event: string) {
        selectFromList({ element: this.elements.searchItem().contains('.oxd-grid-item ', 'Event Name').find('.oxd-select-text'), select: event })
        clickOnButton(this.elements.searchBut())
    }

    approveClaimRequest(eventName: string) {
        this.searchByEvent(eventName)
        this.elements.claimRows().eq(1).find('button').click()
        clickOnSubmitButton(this.elements.buttons().contains('Approve'))
    }

    rejectClaimRequest(eventName: string) {
        this.searchByEvent(eventName)
        this.elements.claimRows().eq(1).find('button').click()
         clickOnSubmitButton(this.elements.buttons().contains('Reject'))
    }

    verfiyClaimStatus(status: string) {
        this.elements.inputGroup().contains('.oxd-input-group', 'Status').find('.oxd-input').should('have.value', status)
    }


}