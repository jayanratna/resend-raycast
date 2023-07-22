import { Detail, MenuBarExtra, environment, getPreferenceValues } from '@raycast/api'
import { useMemo, useState } from 'react'
import { Resend } from 'resend'

let resend: Resend | null = null

export function withResendClient(component: JSX.Element) {
  const [x, forceRerender] = useState(0)

  useMemo(() => {
    ;(async function () {
      const { resend_api_key } = getPreferenceValues<ExtensionPreferences>()

      resend = new Resend(resend_api_key)

      forceRerender(x + 1)
    })()
  }, [])

  if (!resend) {
    if (environment.commandMode === 'view') {
      return <Detail isLoading />
    } else if (environment.commandMode === 'menu-bar') {
      return <MenuBarExtra isLoading />
    } else {
      console.error('withResendClient is only supported in `view` and `menu-bar` mode')
      return null
    }
  }

  return component
}

export function getResendClient() {
  if (!resend) {
    throw new Error('getResendClient must be used when authenticated')
  }

  return resend
}
