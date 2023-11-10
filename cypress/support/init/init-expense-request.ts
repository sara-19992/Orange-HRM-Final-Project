export const initExpenseReq = (expenseID: number, amount: string, date: string) => {
    let payload = {
        amount: amount,
        date: date,
        expenseTypeId: expenseID,
        note: null
    }
    return payload
}