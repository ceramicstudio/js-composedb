import { ScrollArea, Table, Text, Tooltip } from '@mantine/core'
import { graphql } from 'react-relay'

import { shortID } from '../utils.js'
import { useRouteQuery } from '../query.js'

import type { CompositesListQuery } from './__generated__/CompositesListQuery.graphql'

export const compositesQuery = graphql`
  query CompositesListQuery {
    composites {
      id
      compositeID
      description
      enable
      enableMutations
      enableSubscriptions
      models {
        id
        streamID
        name
        description
      }
    }
  }
`

export default function CompositesList() {
  const data = useRouteQuery<CompositesListQuery>(compositesQuery)

  const rows = data.composites.map((composite) => {
    const models = composite.models.map((model) => (
      <li key={model.id}>
        <Tooltip label={model.streamID}>
          <Text>
            {model.name} ({shortID(model.streamID)})
          </Text>
        </Tooltip>
      </li>
    ))

    return (
      <tr key={composite.id}>
        <td>
          <Tooltip label={composite.compositeID}>
            <Text>{shortID(composite.compositeID, 30)}</Text>
          </Tooltip>
        </td>
        <td>{composite.description}</td>
        <td>
          <ul>{models}</ul>
        </td>
        <td>{composite.enable ? 'Yes' : 'No'}</td>
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
            <th>Models</th>
            <th>Enabled</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}
