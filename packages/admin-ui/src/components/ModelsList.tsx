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
      indexDocuments
      composites {
        id
        compositeID
      }
    }
  }
`

export default function ModelsList() {
  const data = useRouteQuery<ModelsListQuery>(modelsQuery)

  const rows = data.models.map((model) => {
    const composites = model.composites.map((composite) => (
      <li key={composite.id}>
        <Tooltip label={composite.compositeID}>
          <Text>{shortID(composite.compositeID, 30)}</Text>
        </Tooltip>
      </li>
    ))

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
        <td>
          <ul>{composites}</ul>
        </td>
        <td>{model.indexDocuments ? 'Yes' : 'No'}</td>
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
