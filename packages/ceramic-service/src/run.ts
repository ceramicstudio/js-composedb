import { inspect } from 'node:util'

import { serviceRouter } from './router.js'

const caller = serviceRouter.createCaller({})

const stream = await caller.loadStream({
  id: 'kjzl6cwe1jw1462ug6gnnij1hyc7zk4g96rqudrhbxwkm618zs54fnd4jaa81m5',
})
console.log('got stream', inspect(stream, { colors: true, depth: null }))
