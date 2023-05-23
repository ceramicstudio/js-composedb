import { Button, Container, Paper, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useSetAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'

import { clientAPIAtom } from '../state.js'

export default function ConnectScreen() {
  const setClientAPI = useSetAtom(clientAPIAtom)
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      url: '',
    },
  })

  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome to ComposeDB Admin</Title>
      <Paper radius="md" mt="xl" p="xl" withBorder>
        <form
          onSubmit={form.onSubmit(({ url }) => {
            setClientAPI(url)
            navigate('/')
          })}>
          <TextInput
            required
            label="Admin API endpoint"
            placeholder="ws://..."
            value={form.values.url}
            onChange={(event) => form.setFieldValue('url', event.currentTarget.value)}
            error={form.errors.url && 'Invalid URL'}
            radius="md"
          />
          <Button fullWidth mt="lg" type="submit">
            Connect
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
