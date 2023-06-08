import useSWR from 'swr'
import { getResendClient } from '../helpers/withResendClient'

import { CreateDomainResponse } from "resend/build/src/domains/interfaces"

export type Domain = CreateDomainResponse

const listDomains = async () => {
    try {
        const servers = await getResendClient().domains.list()
        return servers
    } catch (error) {
        console.error(error)
    }
}

export const useDomains = () => {
    const { data, isLoading } = useSWR('domains', listDomains)

    return {
        domains: data as Domain[] | undefined,
        loading: isLoading
    }
}