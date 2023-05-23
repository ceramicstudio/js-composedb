import { ScrollArea, Table, Text, Tooltip } from '@mantine/core'
import { graphql } from 'react-relay'

import { shortID } from '../utils.js'
import { useRouteQuery } from '../query.js'

import type { ModelsListQuery } from './__generated__/ModelsListQuery.graphql.js'

export const modelsQuery = graphql`
  query ModelsListQuery {
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

export default function ModelsList() {
  const data = useRouteQuery<ModelsListQuery>(modelsQuery)

  const rows = data.models.map((model) => {
    return (
      <tr key={model.id}>
        <td>
          <Tooltip label={model.streamID}>
            <Text>
              {model.name} ({shortID(model.streamID)})
            </Text>
          </Tooltip>
        </td>
        <td>{model.description}</td>
        <td>{model.compositesCount}</td>
        <td>{model.indexingEnabled ? 'Yes' : 'No'}</td>
      </tr>
    )
  })

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Composites</th>
            <th>Indexing</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}
