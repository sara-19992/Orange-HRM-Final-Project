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
