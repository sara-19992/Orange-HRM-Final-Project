
import { URLS } from "../helpers/const-helper"
import { initDeletePaylod } from "../init/init-delete"
import { initEmployee } from "../init/init-employee"
import { initSalary } from "../init/init-salary"
import { initUser } from "../init/init-user"
import { initJobDetails } from "../init/init-job-details"
import salaryInterface from "../interface/salary-interface"
import employeeInterface from "../interface/employee-interface"

const EMPLOYEE_API_URL = URLS.empolyee
const USER_API_URL = URLS.user


export default class EmployeeAPI {

    elements = {
        empLoader: () => cy.get('.oxd-loading-spinner')
    }

    addEmployee(emp: employeeInterface) {
        return new Cypress.Promise((resolve) => {
            let payload = initEmployee(emp.empID, emp.firstName, emp.lastName, emp.middleName)
            cy.orangeAPI('POST', EMPLOYEE_API_URL, payload).then((response) => {
                resolve(response.data.empNumber)
                console.log(response.data.empNumber)
                //add user login details for employee
                let empNum = response.data.empNumber
                let userPayload = initUser(+empNum, emp.username, emp.password)
                cy.orangeAPI('POST', USER_API_URL, userPayload).then(() => {
                    cy.log('**Add New Employee**')
                })
            })
        })
    }

    deleteEmployee(empNum: string) {
        let paylod = initDeletePaylod(+empNum)
        console.log(empNum)
        cy.orangeAPI('DELETE', EMPLOYEE_API_URL, paylod).then(() => {
            cy.orangeAPI('DELETE', USER_API_URL, paylod).then(() => {
                cy.log('**Delete New Employee**')
            })
        })
    }

    addEmployeeDetails(id: number, jobID: number, locationID: number, salary: salaryInterface) {
        let payload = initJobDetails(jobID, locationID)
        cy.orangeAPI('PUT', `${EMPLOYEE_API_URL}/${id}/job-details`, payload).then(() => {
            cy.log('**Add Employee Detailes**')
        })
        this.addSalaryComponent(id, salary)
    }


    addSalaryComponent(id: number, salary: salaryInterface) {
        let payload = initSalary(salary)
        cy.orangeAPI('POST', `${EMPLOYEE_API_URL}/${id}/salary-components`, payload).then(() => {
            cy.log('**Add Salary Component For New Employee**')
        })
    }
}

