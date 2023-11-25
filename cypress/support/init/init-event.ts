import typeInterface from "../interface/type-interface"

export const initType = (event: typeInterface) => {
    let payload = {
        description: event.description,
        name: event.name,
        status: event.status
    }
    return payload
}