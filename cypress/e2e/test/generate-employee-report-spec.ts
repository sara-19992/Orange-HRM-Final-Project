import LoginPage from "../../support/pageObject/login-page";
import EmployeeAPI from "../../support/api/employee-api";
import ReportPage from "../../support/pageObject/report-page";
import { createJobAPI, deleteJob } from "../../support/api/job-api";
import { createLocationAPI, deleteLocation } from "../../support/api/location-api";
import tableValues from "../../support/interface/table-values-interface";

const login: LoginPage = new LoginPage();
const empAPI: EmployeeAPI = new EmployeeAPI();
const reportPage: ReportPage = new ReportPage();

let jobID: any
let joTitle: string
let locationID: any
let empNums: string[] = []
let values: tableValues[] = []

describe('Generate an Employee report with search criteria by (Personal : First name/ Job: Job title/ Salary:Amount)', () => {

    beforeEach(() => {
        cy.visit('/web/index.php')
        cy.fixture('report').as('report')

        cy.fixture('adminLogin').then((admin) => {
            login.userLogin(admin.userName, admin.password)
            login.verfiyElem(admin.dashboard_main_menu_item)
        })
        cy.fixture('job').then((job) => {
            joTitle = job.title
            createJobAPI(job).then((resolve) => {
                jobID = resolve
            })
        })
        cy.fixture('location').then((location) => {
            createLocationAPI(location).then((resolve) => {
                locationID = resolve
            })
        })
        cy.fixture('employees').then((employees: []) => {
            employees.forEach((emp: any) => {
                empAPI.addEmployee(emp).then((resolve) => {
                    let empNum: any = resolve
                    empNums.push(empNum)
                    cy.fixture('salaryComponent').then((salary) => {
                        let v = { name: emp.firstName, job: joTitle, salary: `${salary.salaryAmount}--` }
                        values.push(v)
                        empAPI.addEmployeeDetails(empNum, jobID, locationID, salary)
                    })
                })
            })
        })

    })

    afterEach(() => {
        cy.get('@report').then((report: any) => {
            reportPage.deleteReport(report.name)
        })
        empNums.forEach(empNum => {
            empAPI.deleteEmployee(empNum)
        })
        deleteJob(jobID)
        deleteLocation(locationID)
    })

    it('Generate an Employee report', () => {

        reportPage.goToReport()

        cy.get('@report').then((report: any) => {
            reportPage.createNewReport(report.name, report.criteria, report.displayFields, values)
        })

        reportPage.goToReport()
    })
});
