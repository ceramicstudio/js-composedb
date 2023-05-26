import {
  Alert,
  Button,
  Container,
  LoadingOverlay,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { DID } from 'dids'
import { useSetAtom } from 'jotai'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fromString } from 'uint8arrays'

import { createClient } from '../client.js'
import { adminStateAtom } from '../state.js'

async function authenticate(privateKey: string): Promise<DID> {
  const did = new DID({
    provider: new Ed25519Provider(fromString(privateKey, 'base16')),
    resolver: getResolver(),
  })
  await did.authenticate()
  return did
}

type ConnectionState =
  | { status: 'pending' }
  | { status: 'connecting' }
  | { status: 'error'; message: string }

export default function ConnectScreen() {
  const setAdminState = useSetAtom(adminStateAtom)
  const navigate = useNavigate()
  const [connectionState, setConnectionState] = useState<ConnectionState>({ status: 'pending' })

  const form = useForm({
    initialValues: {
      endpoint: 'http://localhost:3001/admin',
      privateKey: '',
    },
  })

  const alert =
    connectionState.status === 'error' ? (
      <Alert color="red" mb="md" title="Connection failed">
        <Text>{connectionState.message}</Text>
      </Alert>
    ) : null

  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome to ComposeDB Admin</Title>
      <Paper radius="md" mt="xl" p="xl" pos="relative" withBorder>
        <LoadingOverlay visible={connectionState.status === 'connecting'} overlayBlur={2} />
        <form
          onSubmit={form.onSubmit(({ endpoint, privateKey }) => {
            setConnectionState({ status: 'connecting' })
            authenticate(privateKey)
              .then((did) => {
                const client = createClient(endpoint)
                return client.adminAuthenticate.query(did.id).then((valid) => {
                  if (valid) {
                    setAdminState({ client, did })
                    navigate('/')
                  } else {
                    setConnectionState({ status: 'error', message: 'Invalid admin DID' })
                  }
                })
              })
              .catch((err) => {
                setConnectionState({ status: 'error', message: err.message })
              })
          })}>
          {alert}
          <TextInput
            required
            label="Admin API endpoint"
            placeholder="http://localhost:3001/admin"
            value={form.values.endpoint}
            onChange={(event) => form.setFieldValue('endpoint', event.currentTarget.value)}
            error={form.errors.endpoint && 'Invalid endpoint'}
            mb="md"
            radius="md"
          />
          <TextInput
            required
            label="Hexadecimal-encoded DID private key"
            placeholder="abc123..."
            value={form.values.privateKey}
            onChange={(event) => form.setFieldValue('privateKey', event.currentTarget.value)}
            error={form.errors.privateKey && 'Invalid private key'}
            mb="md"
            radius="md"
          />
          <Button fullWidth type="submit">
            Connect
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
