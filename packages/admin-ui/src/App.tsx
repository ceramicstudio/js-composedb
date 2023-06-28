import { MantineProvider, Text } from '@mantine/core'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CompositeEditor from './components/CompositeEditor.js'
import CompositesScreen, { compositesQuery } from './components/CompositesScreen.js'
import ConnectedLayout from './components/ConnectedLayout.js'
import ConnectScreen from './components/ConnectScreen.js'
import EditCompositeScreen, { editCompositeQuery } from './components/EditCompositeScreen.js'
import ModelsScreen, { modelsQuery } from './components/ModelsScreen.js'

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
        Component: CompositesScreen,
      },
      {
        path: '/composites/:id/edit',
        loader: ({ params }) => loadQuery(editCompositeQuery, { id: params.id }),
        Component: EditCompositeScreen,
      },
      {
        path: '/editor',
        Component: CompositeEditor,
      },
      {
        path: '/models',
        loader: () => loadQuery(modelsQuery, {}),
        Component: ModelsScreen,
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
