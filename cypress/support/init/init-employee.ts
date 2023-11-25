export const initEmployee = (empID: string, firstName: string, lastName: string, middleName: string) => {
    let payload = {
        empPicture: null,
        employeeId: empID,
        firstName: firstName,
        lastName: lastName,
        middleName: middleName
    }
    return payload
}