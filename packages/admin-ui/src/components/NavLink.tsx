import { NavLink as Link, type NavLinkProps } from '@mantine/core'
import { NavLink as Nav } from 'react-router-dom'

export type Props = NavLinkProps & {
  end?: boolean
  to: string
}

export default function NavLink({ end, to, ...props }: Props) {
  return (
    <Nav to={to} end={end}>
      {({ isActive }) => <Link active={isActive} {...props} />}
    </Nav>
  )
}
