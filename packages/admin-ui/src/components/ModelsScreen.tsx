import { Accordion, Avatar, Group, ScrollArea, Text } from '@mantine/core'
import { IconArchive, IconArchiveOff } from '@tabler/icons-react'
import { graphql } from 'react-relay'

import { useRouteQuery } from '../query.js'

import type { ModelsScreenQuery } from './__generated__/ModelsScreenQuery.graphql.js'

// eslint-disable-next-line react-refresh/only-export-components
export const modelsQuery = graphql`
  query ModelsScreenQuery {
    models {
      id
      streamID
      name
      description
      indexingEnabled
      compositesCount
    }
  }
`

type IndexingStatusIconProps = {
  enabled: boolean
}

function IndexingStatusIcon({ enabled }: IndexingStatusIconProps) {
  return enabled ? (
    <Avatar alt="Indexing documents" color="green">
      <IconArchive />
    </Avatar>
  ) : (
    <Avatar alt="Not indexing" color="yellow">
      <IconArchiveOff />
    </Avatar>
  )
}

export default function ModelsScreen() {
  const data = useRouteQuery<ModelsScreenQuery>(modelsQuery)

  const items = data.models.map((model) => {
    return (
      <Accordion.Item key={model.id} value={model.id}>
        <Accordion.Control>
          <Group>
            <IndexingStatusIcon enabled={model.indexingEnabled} />
            <div>
              <Text weight="bold">{model.name}</Text>
              <Text color="dimmed">{model.streamID}</Text>
            </div>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <Text>{model.description}</Text>
          <Text>Composites: {model.compositesCount}</Text>
          <Text>Indexing: {model.indexingEnabled ? 'Yes' : 'No'}</Text>
        </Accordion.Panel>
      </Accordion.Item>
    )
  })

  return (
    <ScrollArea>
      <Accordion>{items}</Accordion>
    </ScrollArea>
  )
}
