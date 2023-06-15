import { ActionIcon, AppShell, Flex, Header, Image, Loader, Navbar, Text } from '@mantine/core'
import { IconHexagonalPrism, IconHexagon, IconHexagons, IconLogout } from '@tabler/icons-react'
import { useAtom, useAtomValue } from 'jotai'
import { Suspense } from 'react'
import { RelayEnvironmentProvider } from 'react-relay'
import { Link, Navigate, Outlet } from 'react-router-dom'

import { adminStateAtom, relayEnvironmentAtom } from '../state.js'

import NavLink from './NavLink.js'

export default function ConnectedLayout() {
  const [adminState, setAdminState] = useAtom(adminStateAtom)
  const env = useAtomValue(relayEnvironmentAtom)

  return env ? (
    <RelayEnvironmentProvider environment={env}>
      <AppShell
        padding={0}
        styles={{ main: { display: 'flex' } }}
        header={
          <Header
            height={60}
            p="xs"
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Image src="/ceramic.svg" width={42} height={42} />
            <Link to="/">
              <Text color="orange" ml="md" size="lg" weight="bold">
                ComposeDB Admin
              </Text>
            </Link>
            <Flex justify="flex-end" gap="md" sx={{ flex: 1 }}>
              <Text color="dimmed">{adminState?.did.id}</Text>
              <ActionIcon
                onClick={() => {
                  setAdminState(null)
                }}>
                <IconLogout />
              </ActionIcon>
            </Flex>
          </Header>
        }
        navbar={
          <Navbar width={{ base: 300 }} height={500}>
            <NavLink icon={<IconHexagon />} label="Local models" to="/models" />
            <NavLink icon={<IconHexagons />} label="Local composites" to="/composites" />
            <NavLink icon={<IconHexagonalPrism />} label="Composite editor" to="/editor" />
          </Navbar>
        }>
        <Suspense fallback={<Loader variant="bars" />}>
          <Outlet />
        </Suspense>
      </AppShell>
    </RelayEnvironmentProvider>
  ) : (
    <Navigate to="/connect" replace />
  )
}
