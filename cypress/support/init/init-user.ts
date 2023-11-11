export const initUser = (id: number, username: string, password: string) => {
    let payload = {
        empNumber: id,
        password: password,
        status: true,
        userRoleId: 2,
        username: username
    }
    return payload
}