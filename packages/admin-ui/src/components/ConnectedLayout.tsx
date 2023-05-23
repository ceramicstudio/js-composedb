import { AppShell, Header, Image, Loader, Navbar, Text } from '@mantine/core'
import { IconHexagon, IconHexagons } from '@tabler/icons-react'
import { useAtomValue } from 'jotai'
import { Suspense } from 'react'
import { RelayEnvironmentProvider } from 'react-relay'
import { Link, Navigate, Outlet } from 'react-router-dom'

import { relayEnvironmentAtom } from '../state.js'

import NavLink from './NavLink.js'

export default function ConnectedLayout() {
  const env = useAtomValue(relayEnvironmentAtom)

  return env ? (
    <RelayEnvironmentProvider environment={env}>
      <AppShell
        padding="md"
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
          </Header>
        }
        navbar={
          <Navbar width={{ base: 300 }} height={500}>
            <NavLink icon={<IconHexagons />} label="Composites" to="/composites" />
            <NavLink icon={<IconHexagon />} label="Models" to="/models" />
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
