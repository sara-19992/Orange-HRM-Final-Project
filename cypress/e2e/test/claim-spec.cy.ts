import LoginPage from "../../support/pageObject/login-page";
import EmployeeAPI from "../../support/api/employee-api";
import employeeClaimPage from "../../support/pageObject/employee-claim-page";
import { createEvent, deleteEvent } from "../../support/api/event-api";
import { createExpenseType, deleteExpenseType } from "../../support/api/expens-api";
import { createClaimRequest } from "../../support/api/claim-request-api";
import employeeInterface from "../../support/interface/employee-interface";

const login: LoginPage = new LoginPage();
const empAPI: EmployeeAPI = new EmployeeAPI();
const claimPage: employeeClaimPage = new employeeClaimPage();

let empNum: any
let eventID: any
let eventName: string
let expenseID: any
let admin: any

describe('Claims Request Approval and Rejection For Employee', () => {

    beforeEach(() => {
        cy.visit('/web/index.php')

        cy.fixture('adminLogin').then((adminLogin) => {
            admin = adminLogin
            login.userLogin(admin.userName, admin.password)
            login.verfiyElem(admin.dashboard_main_menu_item)
        })

        //create new event for claim
        cy.fixture('event').then((event) => {
            createEvent(event).then((resolve) => {
                eventName = event.name
                eventID = resolve
            })
        })

        //creat net expense for claim
        cy.fixture('expense').then((expense) => {
            createExpenseType(expense).then((resolve) => {
                expenseID = resolve
            })
        })

        //create new employee and assign it a new claim
        cy.fixture('employees').then((employees: employeeInterface[]) => {
            let emp = employees[0]
            empAPI.addEmployee(emp).then((resolve) => {
                empNum = resolve
                login.userLogout()
                login.userLogin(emp.username, emp.password)
                cy.fixture('claim').then((claim) => {
                    createClaimRequest(eventID, expenseID, claim)
                })
                login.userLogout()
                login.userLogin(admin.userName, admin.password)
            })
        })
    })

    afterEach(() => {
        empAPI.deleteEmployee(empNum)
        deleteEvent(eventID)
        deleteExpenseType(expenseID)
    })

    it('Approve Claim Request For Employee', () => {
        claimPage.goToEmoClaim()
        claimPage.approveClaimRequest(eventName)
    })

    it('Reject Claim Request For Employee', () => {
        claimPage.goToEmoClaim()
        claimPage.rejectClaimRequest(eventName)
    })
});
