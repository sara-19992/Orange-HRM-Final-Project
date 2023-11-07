import { selectFromList, typeInputField } from "../helpers/generic-helper";
import displayField from "../interface/display-feild-interface";
import selectCriteria from "../interface/select-criteria-interface";
import tableValues from "../interface/table-values-interface";

export default class ReportPage {

    elements = {
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
        topBar: () => cy.get('.oxd-topbar'),
        addBut: () => cy.get('button'),
        reportRows: () => cy.get('.oxd-table-row'),
        deleteBut: () => cy.get('button'),
        reportName: () => cy.getByPlaceholder("Type here ..."),
        addSelection: () => cy.get('.oxd-icon-button'),
        saveBut: () => cy.get('button[type="submit"]'),
        formRow: () => cy.get('.oxd-form-row'),
        reportNameField: () => cy.get('.orangehrm-main-title'),
        reportEmpRows: () => cy.get('.rgRow'),
        header: () => cy.get('.header-rgRow'),
        reportContent: () => cy.get('.content-wrapper')

    };

    goToReport() {
        this.elements.MainMenuItems().contains('PIM').click({ force: true })
        this.elements.topBar().contains('Reports').click()
    }

    createNewReport(name: string, selectCretiria: [], disaplyFields: displayField[], values: tableValues[]) {
        this.elements.addBut().contains('Add').click()
        typeInputField([{
            element: this.elements.reportName(),
            str: name
        }])
        this.selectSearchCriteria(selectCretiria)
        this.selectDisplayFeild(disaplyFields)
        this.elements.saveBut().click()

        this.verfyNewReport(name, disaplyFields, values)
    }

    selectForm(name: string) {
        //to select criteria form or display form
        return this.elements.formRow().contains('.oxd-form-row', name).find('.oxd-select-text')
    }


    clickFormBut(name: string) {
        ////to click add button for criteria form or display form
        return this.elements.formRow().contains('.oxd-form-row', name).find('.bi-plus').click()
    }

    selectSearchCriteria(criteriaNames: selectCriteria[]) {
        criteriaNames.forEach(criteria => {
            selectFromList({ element: this.selectForm('Selection Criteria').eq(0), select: criteria.select })
            this.clickFormBut('Selection Criteria')
            selectFromList({ element: this.elements.formRow().contains('div', criteria.select).next(), select: criteria.value })

        })
    }

    selectDisplayFeild(displayFields: displayField[]) {
        displayFields.forEach(display => {
            selectFromList({ element: this.selectForm('Display Fields').eq(0), select: display.feildGroup })
            selectFromList({ element: this.selectForm('Display Fields').eq(1), select: display.feildName })
            this.clickFormBut('Display Fields')
        })
    }

    deleteReport(name: string) {
        this.elements.reportRows().contains('.oxd-table-row', name).find('button').eq(0).click({ force: true })
        this.elements.deleteBut().contains('Yes, Delete').click({ force: true })
        cy.log('**Delete New Report**')
    }

    verfyNewReport(name: string, disaplyFields: displayField[], values: tableValues[]) {
        this.verfyReportName(name)
        this.verfyReporHeaders(disaplyFields)
        this.verfyReporValues(values)
        this.verfyReportLength(3)
    }

    verfyReportName(name: string) {
        this.elements.reportNameField().should('have.text', name)
    }

    verfyReportLength(length: number) {
        this.elements.reportEmpRows().should('have.length', length)
    }

    verfyReporHeaders(disaplyFields: displayField[]) {
        this.elements.header().find('.rgHeaderCell').each(($el, index) => {
            cy.wrap($el).should('have.text', disaplyFields[index].feildName)
        })

    }

    verfyReporValues(values: tableValues[]) {
        this.elements.reportContent().find('div.rgRow').each(($row, i) => {
            cy.wrap($row).find('.rgCell').each(($cell, j) => {
                cy.wrap($cell).should('have.text', Object.values(values[i])[j])
            })
        })
    }
}