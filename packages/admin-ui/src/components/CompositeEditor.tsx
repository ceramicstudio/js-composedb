import { Avatar, Box, Button, Drawer, HoverCard, Text, useMantineTheme } from '@mantine/core'
import { IconZoomIn, IconZoomOut, IconZoomReset } from '@tabler/icons-react'
import {
  type Simulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
  forceCenter,
  forceCollide,
  forceLink,
  forceSimulation,
} from 'd3-force'
import { nanoid } from 'nanoid'
import { type RefObject, createRef, useState } from 'react'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'

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

const node1 = createCardNode()
const node2 = createCardNode()
const nodes = {
  [node1.id]: node1,
  [node2.id]: node2,
}

function EditorControls() {
  const { centerView, zoomIn, zoomOut } = useControls()

  return (
    <Button.Group>
      <Button variant="default" onClick={() => zoomIn()}>
        <IconZoomIn />
      </Button>
      <Button variant="default" onClick={() => zoomOut()}>
        <IconZoomOut />
      </Button>
      <Button variant="default" onClick={() => centerView(1)}>
        <IconZoomReset />
      </Button>
    </Button.Group>
  )
}

export default function CompositeEditor() {
  const theme = useMantineTheme()
  const [openDrawerID, setOpenDrawerID] = useState<string | null>(null)

  // Note: this is mutated by the simulation code
  const links: Array<CardLink> = [{ source: node1.id, target: node2.id }]

  const [state] = useState<EditorState>({
    simulation: forceSimulation<CardNode>(Object.values(nodes))
      .force('center', forceCenter(500, 500))
      .force('collide', forceCollide(50))
      .force(
        'links',
        forceLink<CardNode, CardLink>(links).id((node) => node.id)
      )
      .stop()
      .tick(50),
  })

  const displayNodes = state.simulation.nodes().map((node) => {
    return (
      <HoverCard width={300}>
        <HoverCard.Target>
          <Avatar
            key={node.id}
            ref={node.ref}
            color="orange"
            radius="xl"
            onClick={() => setOpenDrawerID(node.id)}
            sx={{ position: 'absolute', left: node.x ?? 500, top: node.y ?? 500 }}>
            {node.id.substring(0, 3)}
          </Avatar>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">Description of the model/entity</Text>
        </HoverCard.Dropdown>
      </HoverCard>
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
    return source == null || target == null ? null : (
      <line
        key={source.id + target.id + i}
        stroke={theme.colors.orange[0]}
        strokeWidth={3}
        {...positions}
      />
    )
  })

  return (
    <TransformWrapper centerOnInit maxScale={2} minScale={0.5}>
      <Drawer
        position="right"
        withOverlay={false}
        opened={openDrawerID != null}
        onClose={() => {
          setOpenDrawerID(null)
        }}
        title="Node details"
        styles={{ content: { marginTop: 60 } }}>
        <Text>Node details content</Text>
      </Drawer>
      <EditorControls />
      <TransformComponent
        wrapperStyle={{
          display: 'flex',
          flex: 1,
          height: '100%',
          maxHeight: 'calc(100vh - 60px)',
        }}>
        <svg width="1000" height="1000" viewBox="0 0 1000 1000">
          {displayLinks}
        </svg>
        <Box sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
          {displayNodes}
        </Box>
      </TransformComponent>
    </TransformWrapper>
  )
}
