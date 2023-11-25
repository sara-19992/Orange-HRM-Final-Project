import vacancyInterface from "../interface/vacancy-interface"

export const initVacancy = (vacancy: vacancyInterface, employeeId: number,jobId:number) => {
    let payload = {
        description: vacancy.description,
        employeeId: employeeId,
        isPublished: vacancy.isPublished,
        jobTitleId: jobId,
        name: vacancy.name,
        numOfPositions: vacancy.numOfPositions,
        status: vacancy.status
    }
    return payload
}