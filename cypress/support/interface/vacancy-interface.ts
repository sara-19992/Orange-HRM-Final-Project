import { StringChain } from "cypress/types/lodash"

export default interface vacancyInterface {
    description: StringChain,
    isPublished: boolean,
    jobTitleId: number,
    name: string,
    numOfPositions: number,
    status: boolean
}