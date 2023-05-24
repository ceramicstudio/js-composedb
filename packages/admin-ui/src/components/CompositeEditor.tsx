import { Loader } from '@mantine/core'
import Editor from '@monaco-editor/react'
import { useAtom } from 'jotai'

import { compositeEditorValueAtom } from '../state.js'

export default function CompositeEditor() {
  const [value, setValue] = useAtom(compositeEditorValueAtom)

  return (
    <Editor
      keepCurrentModel
      language="graphql"
      loading={<Loader />}
      onChange={(newValue) => {
        setValue(newValue ?? '')
      }}
      options={{ minimap: { enabled: false } }}
      value={value}
    />
  )
}
