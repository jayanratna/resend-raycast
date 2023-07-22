import useSWR from 'swr'
import { getResendClient } from '../utils/withResendClient'

async function listApiKeys() {
  try {
    const apiKeys = await getResendClient().apiKeys.list()
    return apiKeys
  } catch (error) {
    console.error(error)
  }
}

export function useApiKeys() {
  const { data, isLoading } = useSWR('api-keys', listApiKeys)

  return {
    apiKeys: data,
    loading: isLoading,
  }
}
