import { Action, ActionPanel, Icon, List } from '@raycast/api'
import { format } from 'date-fns'
import View from './components/View'
import { useApiKeys } from './hooks/useApiKeys'

function ViewApiKeys() {
  const { apiKeys, loading } = useApiKeys()

  return (
    <List isLoading={loading}>
      {apiKeys?.map((apiKey) => {
        const createdAt = new Date(apiKey.created_at)

        return (
          <List.Item
            id={apiKey.id.toString()}
            key={apiKey.id}
            title={apiKey.name}
            accessories={[{ date: createdAt, tooltip: `Created: ${format(createdAt, "EEEE d MMMM yyyy 'at' HH:mm")}` }]}
            icon={{ source: Icon.Key }}
            actions={
              <ActionPanel>
                <ActionPanel.Section>
                  <Action
                    title="Remove API Key"
                    icon={Icon.Trash}
                    style={Action.Style.Destructive}
                    shortcut={{ modifiers: ['cmd'], key: 'delete' }}
                  />
                </ActionPanel.Section>
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
      <ViewApiKeys />
    </View>
  )
}
