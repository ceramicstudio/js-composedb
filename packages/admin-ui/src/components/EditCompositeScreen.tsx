import { graphql } from 'react-relay'

import { useRouteQuery } from '../query.js'

import type { EditCompositeScreenQuery } from './__generated__/EditCompositeScreenQuery.graphql.js'

// eslint-disable-next-line react-refresh/only-export-components
export const editCompositeQuery = graphql`
  query EditCompositeScreenQuery($id: ID!) {
    node(id: $id) {
      ... on Composite {
        id
        compositeID
        isEnabled
        label
        description
        commonEmbeds
        models {
          id
          streamID
          controller
          name
          description
          content
          indexingEnabled
          documentsCount
        }
      }
    }
  }
`

export default function EditCompositeScreen() {
  const data = useRouteQuery<EditCompositeScreenQuery>(editCompositeQuery)

  console.log('got composite data', data)

  return null
}
