import { Action, ActionPanel, Icon, List, Toast, showToast } from '@raycast/api'
import { useDomains } from './hooks/useDomains'
import View from './components/View'
import DomainDetail from './components/DomainDetail'
import { getRegion, getDomainStatus } from './utils/domain'

function ViewDomains() {
  const { domains, loading, mutate } = useDomains()

  return (
    <List isLoading={loading}>
      {domains?.map((domain) => {
        const domainStatus = getDomainStatus(domain.status)
        const domainRegion = getRegion(domain.region)

        async function removeDomain() {
          const toast = await showToast({ style: Toast.Style.Animated, title: 'Deleting domain' })

          try {
            await mutate()

            toast.style = Toast.Style.Success
            toast.title = 'Deleted domain'
          } catch (error) {
            toast.style = Toast.Style.Failure
            toast.title = 'Failed deleting domain'
            if (error instanceof Error) {
              toast.message = error.message
            }
          }
        }

        return (
          <List.Item
            id={domain.id.toString()}
            key={domain.id}
            title={domain.name}
            accessories={[{ text: domainRegion }, { tag: { value: domainStatus.text, color: domainStatus.color } }]}
            icon={{
              source: Icon.Globe,
            }}
            actions={
              <ActionPanel>
                <ActionPanel.Section>
                  <Action.Push
                    title="View Domain"
                    icon={Icon.Binoculars}
                    target={<DomainDetail initialDomain={domain} />}
                  />
                  <Action
                    title="Remove Domain"
                    icon={Icon.Trash}
                    style={Action.Style.Destructive}
                    onAction={removeDomain}
                    shortcut={{ modifiers: ['cmd'], key: 'delete' }}
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
