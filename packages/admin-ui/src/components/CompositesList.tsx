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
      isEnabled
      mutationsEnabled
      subscriptionsEnabled
      modelsCount
    }
  }
`

export default function CompositesList() {
  const data = useRouteQuery<CompositesListQuery>(compositesQuery)

  const rows = data.composites.map((composite) => {
    return (
      <tr key={composite.id}>
        <td>
          <Tooltip label={composite.compositeID}>
            <Text>{shortID(composite.compositeID, 30)}</Text>
          </Tooltip>
        </td>
        <td>{composite.description}</td>
        <td>{composite.modelsCount}</td>
        <td>{composite.isEnabled ? 'Yes' : 'No'}</td>
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
