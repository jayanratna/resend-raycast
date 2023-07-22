import { Color } from '@raycast/api'
import { Domain } from '../hooks/useDomains'

export function getRegion(region: Domain['region']): string {
  switch (region) {
    case 'eu-west-1':
      return 'Ireland'
    case 'sa-east-1':
      return 'São Paulo'
    case 'us-east-1':
      return 'North Virginia'
    default:
      return 'Region'
  }
}

export function getDomainStatus(status: Domain['status']): { text: string; color: string } {
  switch (status) {
    case 'pending':
      return { text: 'Pending', color: Color.Yellow }
    case 'verified':
      return { text: 'Pending', color: Color.Yellow }
    case 'failed':
      return { text: 'Pending', color: Color.Yellow }
    case 'temporary_failure':
      return { text: 'Pending', color: Color.Yellow }
    case 'not_started':
      return { text: 'Not Started', color: Color.SecondaryText }
    default:
      return { text: 'Status', color: Color.SecondaryText }
  }
}
