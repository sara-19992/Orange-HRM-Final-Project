import inputFeild from "../interface/input-feiled-interface";
import selectFeild from "../interface/select-feild-interface";

const elements = {
  dropList: () => cy.get('.oxd-select-dropdown'),
}

export const typeInputField = (arr: inputFeild[]) => {
  arr.forEach((elem) => {
    elem.element.type(elem.str);
  })
}

export const selectFromList = (obj: selectFeild) => {
  obj.element.click()
  elements.dropList().contains(obj.select).click()
}

export const uploadFile = (element: Cypress.Chainable<JQuery<HTMLElement>>, filePath: string) => {
  element.selectFile(filePath, { force: true });
}


export const verfiyFileEqual = (fileName:string) => {
  cy.fixture(fileName).then(file => {
    cy.readFile(`cypress/downloads/${fileName}`).then(download => {
       expect(file).to.eq(download)
      //assert(fixture === download, 'files are matching').to.eq(true)
    })
  })
}