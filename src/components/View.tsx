import { withResendClient } from "../helpers/withResendClient"

export default function View({ children }: { children: JSX.Element }) {
    return withResendClient(children)
}