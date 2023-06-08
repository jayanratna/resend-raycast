import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";
import { Domain, useDomains } from "./hooks/useDomains";
import View from "./components/View";
import DomainDetail from "./components/DomainDetail";

const getRegion = (region: Domain['region']): string => {
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
const getDomainStatus = (status: Domain['status']): { text: string, color: string } => {
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

function ViewDomains() {
    const { domains, loading } = useDomains()

    return(
        <List isLoading={loading}>
            {domains?.map((domain) => {
                const domainStatus = getDomainStatus(domain.status)
                return (
                    <List.Item
                        id={domain.id.toString()}
                        key={domain.id}
                        title={domain.name}
                        accessories={[
                            { text: getRegion(domain.region) },
                            { tag: { value: domainStatus.text, color: domainStatus.color } }
                        ]}
                        icon={{
                            source: Icon.Globe
                        }}
                        actions={
                            <ActionPanel>
                                <ActionPanel.Section>
                                    <Action.Push
                                        title="Open Domain Information"
                                        icon={Icon.Binoculars}
                                        target={<DomainDetail initialDomain={domain} />}
                                    />
                                </ActionPanel.Section>
                                <ActionPanel.Section title="Commands"></ActionPanel.Section>
                            </ActionPanel>
                        }
                    />
                )
            })}
        </List>
    )
}

export default function Command() {
    return (
        <View>
            <ViewDomains />
        </View>
    )
}