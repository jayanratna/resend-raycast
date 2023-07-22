import { withResendClient } from '../utils/withResendClient'

export default function View({ children }: { children: JSX.Element }) {
  return withResendClient(children)
}
