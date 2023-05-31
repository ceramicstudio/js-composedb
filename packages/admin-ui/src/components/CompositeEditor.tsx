import { Avatar, Box } from '@mantine/core'
import {
  type Simulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
  forceCenter,
  forceCollide,
  forceLink,
  forceSimulation,
} from 'd3-force'
import { useAtom } from 'jotai'
import { nanoid } from 'nanoid'
import { type RefObject, createRef, useRef, useState } from 'react'
import Draggable from 'react-draggable'

import { compositeEditorValueAtom } from '../state.js'

type CardNode = SimulationNodeDatum & {
  id: string
  ref: RefObject<HTMLDivElement>
}

type CardLink = SimulationLinkDatum<CardNode>

type EditorState = {
  simulation: Simulation<CardNode, CardLink>
}

function createCardNode(): CardNode {
  return { id: nanoid(), ref: createRef<HTMLDivElement>() }
}

type Position = { x: number; y: number }

function getRelativePosition(
  container: RefObject<HTMLDivElement>,
  element: RefObject<HTMLDivElement>,
  fallback: Position = { x: 0, y: 0 }
): Position {
  const containerRect = container.current?.getBoundingClientRect()
  const elementRect = element.current?.getBoundingClientRect()
  return containerRect == null || elementRect == null
    ? fallback
    : { x: elementRect.x - containerRect.x, y: elementRect.y - containerRect.y }
}

const node1 = createCardNode()
const node2 = createCardNode()
const nodes = {
  [node1.id]: node1,
  [node2.id]: node2,
}

export default function CompositeEditor() {
  const [value, setValue] = useAtom(compositeEditorValueAtom)

  const containerRef = useRef<HTMLDivElement>(null)

  // Note: this is mutated by the simulation code
  const links: Array<CardLink> = [{ source: node1.id, target: node2.id }]

  const [state, setState] = useState<EditorState>({
    simulation: forceSimulation<CardNode>(Object.values(nodes))
      .force('center', forceCenter(300, 300))
      .force('collide', forceCollide(50))
      .force(
        'links',
        forceLink<CardNode, CardLink>(links).id((node) => node.id)
      )
      .stop()
      .tick(50),
  })

  // console.log('simulation', state.simulation, nodes)

  const displayNodes = state.simulation.nodes().map((node) => {
    console.log('position node', node.id, node.x, node.y)

    return (
      <Draggable
        key={node.id}
        nodeRef={node.ref}
        position={{ x: node.x ?? 300, y: node.y ?? 300 }}
        onDrag={(e) => {
          // TODO: update simluation state with fixed node position
          const position = getRelativePosition(containerRef, node.ref)
          nodes[node.id].fx = position.x
          nodes[node.id].fy = position.y
          setState({ simulation: state.simulation.nodes(Object.values(nodes)) })
          console.log('drag', position)
        }}
        onStop={(e) => {
          console.log('drag stop', getRelativePosition(containerRef, node.ref))
        }}>
        <Avatar ref={node.ref} color="cyan" radius="xl" sx={{ position: 'absolute' }}>
          {node.id.substring(0, 3)}
        </Avatar>
      </Draggable>
    )
  })

  const displayLinks = links.map((link, i) => {
    const source = link.source as CardNode
    const target = link.target as CardNode
    const x1 = (source.x ?? 0) + 20
    const y1 = (source.y ?? 0) + 20
    const x2 = (target.x ?? 0) + 20
    const y2 = (target.y ?? 0) + 20
    const positions = { x1, y1, x2, y2 }
    console.log('link', positions)
    return source == null || target == null ? null : (
      <line key={source.id + target.id + i} stroke="#ff0000" strokeOpacity={0.7} {...positions} />
    )
  })

  return (
    <Box
      ref={containerRef}
      sx={{ position: 'relative', width: 600, height: 600, border: '1px solid red' }}>
      <svg width={600} height={600} viewBox="0 0 600 600">
        {displayLinks}
      </svg>
      <Box sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>{displayNodes}</Box>
    </Box>
  )
}
