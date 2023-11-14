import interiewInterface from "../interface/interview-interface"

export const initInterview = (interview:interiewInterface,interviewerEmpNumbers: number[]) => {
    let payload = {
        interviewDate: interview.interviewDate,
        interviewName: interview.interviewName,
        interviewTime: interview.interviewTime,
        interviewerEmpNumbers: interviewerEmpNumbers,
        note: interview.note,
    }
    return payload
}