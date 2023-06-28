import { ScrollArea, Table, Tooltip } from '@mantine/core'
import { graphql } from 'react-relay'
import { Link } from 'react-router-dom'

import { shortID } from '../utils.js'
import { useRouteQuery } from '../query.js'

import type { CompositesScreenQuery } from './__generated__/CompositesScreenQuery.graphql.js'

// eslint-disable-next-line react-refresh/only-export-components
export const compositesQuery = graphql`
  query CompositesScreenQuery {
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

export default function CompositesScreen() {
  const data = useRouteQuery<CompositesScreenQuery>(compositesQuery)

  const rows = data.composites.map((composite) => {
    return (
      <tr key={composite.id}>
        <td>
          <Tooltip label={composite.compositeID}>
            <Link to={`/composites/${composite.id}/edit`}>
              {shortID(composite.compositeID, 30)}
            </Link>
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
