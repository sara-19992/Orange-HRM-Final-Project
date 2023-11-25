import locationInterface from "../interface/location-interface"

export const initLocation = (location: locationInterface) => {
    let payload = {
        address: location.address,
        city: location.city,
        countryCode: location.countryCode,
        fax: location.fax,
        name: location.name,
        note: location.note,
        phone: location.phone,
        province: location.province,
        zipCode: location.zipCode
    }
    return payload
}