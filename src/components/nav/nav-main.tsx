'use client'

import { PlusCircleIcon, type LucideIcon } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useRouter } from 'next/navigation'
import { CreateTaskForm } from '@/components/tasks/create-task-form'
import { useState } from 'react'
import { User } from 'next-auth'
import paths from '@/paths'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
  user: User | undefined
}) {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent className='flex flex-col gap-2'>
          <SidebarMenu>
            <SidebarMenuItem className='flex items-center gap-2'>
              <SidebarMenuButton
                tooltip='Quick Create'
                className='min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground'
                onClick={() => {
                  router.push(paths.dashboard())
                  setModalOpen(true)
                }}
              >
                <PlusCircleIcon />
                <span>Create Task</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  onClick={() => router.push(item.url)}
                  tooltip={item.title}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <CreateTaskForm
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  )
}
