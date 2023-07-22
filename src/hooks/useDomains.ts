import useSWR from 'swr'
import { getResendClient } from '../utils/withResendClient'

import { CreateDomainResponse } from 'resend/build/src/domains/interfaces'

export type Domain = CreateDomainResponse

async function listDomains() {
  try {
    const domains = await getResendClient().domains.list()
    return domains
  } catch (error) {
    console.error(error)
  }
}

export function useDomains() {
  const { data, isLoading, mutate } = useSWR('domains', listDomains)

  return {
    domains: data as Domain[] | undefined,
    mutate,
    loading: isLoading,
  }
}
