import salaryInterface from "../interface/salary-interface"

export const initSalary = (salary: salaryInterface) => {
    let payload = {
        addDirectDeposit: salary.addDirectDeposit,
        comment: salary.comment,
        currencyId: salary.currencyId,
        payFrequencyId: salary.payFrequencyId,
        payGradeId: salary.payGradeId,
        salaryAmount: salary.salaryAmount,
        salaryComponent: salary.salaryComponent
    }
    return payload
}