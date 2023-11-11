export const initClaimRequest = (claimEventId: number, currencyId: string) => {
    let payload = {
        claimEventId: claimEventId,
        currencyId: currencyId,
        remarks: null
    }
    return payload
}