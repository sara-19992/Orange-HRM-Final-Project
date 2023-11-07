import jobInterface from "../interface/job-interface"

export const initJob = (job: jobInterface) => {
    let payload = {
        description: job.description,
        note: job.note,
        specification: job.specification,
        title: job.title
    }
    return payload
}