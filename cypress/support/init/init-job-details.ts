export const initJobDetails = (jobID: number, locationID: number) => {
    let payload = {
        jobTitleId: jobID,
        joinedDate: null,
        locationId: locationID
    }
    return payload
}