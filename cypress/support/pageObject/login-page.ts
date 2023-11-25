import { typeInputField } from "../helpers/generic-helper";

export default class LoginPage {
    elements = {
        userName: () => cy.getByPlaceholder("Username"),
        password: () => cy.getByPlaceholder("Password"),
        loginBut: () => cy.get("button"),
        forgetText: () => cy.get(".orangehrm-login-forgot-header"),
        resetForm: () => cy.get(".oxd-form"),
        resetUserName: () => cy.get('[placeholder="Username"]'),
        resetPasswordBut: () => cy.get('button[type="submit"]'),
        resetText: () => cy.get(".oxd-text--h6"),
        userBut: () => cy.get(".oxd-userdropdown"),
        userLogoutMenu: () => cy.get(".oxd-dropdown-menu"),
    };

    assertianElem = [
        {
            msg: "Dashboard",
            elem: () => cy.get(".oxd-topbar-header-breadcrumb"),
        },
        {
            msg: "Required",
            elem: () => cy.get(".oxd-input-field-error-message"),
        },
        {
            msg: "Invalid credentials",
            elem: () => cy.get(".oxd-text oxd-text--p oxd-alert-content-text"),
        },
    ];

    userLogin(userName: string, password: string) {
        cy.visit('/web/index.php')
        typeInputField([
            { element: this.elements.userName(), str: userName },
            { element: this.elements.password(), str: password },
        ]);
        this.elements.loginBut().click().should("not.exist");
    }

    userLogout() {
        this.elements.userBut().click();
        this.elements.userLogoutMenu().contains("Logout").click();
    }

    forget(user: any) {
        this.elements.forgetText().click();
        this.elements.resetForm().should("contain", "Reset Password");
        typeInputField([
            { element: this.elements.resetUserName(), str: user.userName },
        ]);
        this.elements.resetPasswordBut().click().should("not.exist");
        this.elements
            .resetText()
            .should("contain", "Reset Password link sent successfully");
    }

    verfiyElem(message: string) {
        this.assertianElem.find(({ msg }) => msg === message)?.elem;
    }
}

