'use client'

import * as React from 'react'
import { ArrowUpCircleIcon, LayoutDashboardIcon } from 'lucide-react'
import { NavMain } from '@/components/nav/nav-main'
import { NavUser } from '@/components/nav/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import paths from '@/paths'
import { User } from 'next-auth'

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: paths.dashboard(),
      icon: LayoutDashboardIcon,
    },
  ],
}

export function AppSidebar({ user }: { user: User | undefined }) {
  return (
    <>
      <Sidebar collapsible='offcanvas'>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className='data-[slot=sidebar-menu-button]:!p-1.5'
              >
                <a href={paths.dashboard()}>
                  <ArrowUpCircleIcon className='h-5 w-5' />
                  <span className='text-base font-semibold'>mobup.</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain user={user} items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
