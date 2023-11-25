import { candidateInterface } from "../interface/candidate-interface"

export const initCandidate = (candidate:candidateInterface, vacancyId: number) => {
    let payload = {
        comment: candidate.comment,
        consentToKeepData: candidate.consentToKeepData,
        contactNumber: candidate.contactNumber,
        dateOfApplication: candidate.dateOfApplication,
        email: candidate.email,
        firstName: candidate.firstName,
        keywords: candidate.keywords,
        lastName: candidate.lastName,
        middleName: candidate.middleName,
        vacancyId: vacancyId
    }
    return payload
}