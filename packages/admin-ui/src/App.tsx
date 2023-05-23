import { MantineProvider, Text } from '@mantine/core'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CompositesList, { compositesQuery } from './components/CompositesList.js'
import ConnectedLayout from './components/ConnectedLayout.js'
import ConnectScreen from './components/ConnectScreen.js'
import ModelsList, { modelsQuery } from './components/ModelsList.js'

import { loadQuery } from './query.js'

const router = createBrowserRouter([
  {
    path: '/',
    Component: ConnectedLayout,
    children: [
      {
        index: true,
        element: <Text>Admin</Text>,
      },
      {
        path: '/composites',
        loader: () => loadQuery(compositesQuery, {}),
        Component: CompositesList,
      },
      {
        path: '/models',
        loader: () => loadQuery(modelsQuery, {}),
        Component: ModelsList,
      },
    ],
  },
  { path: '/connect', Component: ConnectScreen },
])

export default function App() {
  return (
    <MantineProvider
      theme={{
        globalStyles: () => ({
          a: {
            textDecoration: 'none',
          },
        }),
        primaryColor: 'orange',
      }}
      withNormalizeCSS
      withGlobalStyles>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}
