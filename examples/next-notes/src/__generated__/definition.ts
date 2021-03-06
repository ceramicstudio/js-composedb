// This is an auto-generated file, do not edit manually
import type { RuntimeCompositeDefinition } from '@composedb/types'
export const definition: RuntimeCompositeDefinition = {
  models: {
    Profile: 'kjzl6hvfrbw6c9ybqwsouk360g9xpa9242yywdoz01cgprao3e97g1hrn3krxxn',
    Note: 'kjzl6hvfrbw6cb1d0zxu1njiaz4rcf0hxln322zuuavwyua9l1oe4c4xzvjmk3r',
  },
  objects: {
    Profile: { name: { type: 'string', required: true } },
    Note: {
      text: { type: 'string', required: true },
      title: { type: 'string', required: true },
      author: { type: 'view', viewType: 'documentAccount' },
      version: { type: 'view', viewType: 'documentVersion' },
    },
  },
  accountData: {
    profile: { type: 'node', name: 'Profile' },
    noteList: { type: 'connection', name: 'Note' },
  },
}
