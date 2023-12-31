import { Link } from '@tanstack/react-router'
import { Home } from 'lucide-react'
import React from 'react'

export default function SidebarLinks() {
  return (
    <div className='flex flex-col gap-3'>
      <SidebarLink to='/'>
        <Home className='h-4 w-4' />
        Главная
      </SidebarLink>
    </div>
  )
}

function SidebarLink({
  children,
  to,
}: {
  children: React.ReactNode
  to: string
}) {
  return (
    <Link
      to={to}
      activeProps={{
        className: 'bg-primary text-white',
      }}
      inactiveProps={{
        className: 'hover:bg-secondary',
      }}
      className='flex gap-2 items-center px-3 py-1.5 rounded-lg transition-colors'
    >
      {children}
    </Link>
  )
}
