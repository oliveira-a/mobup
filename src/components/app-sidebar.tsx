"use client"

import * as React from "react"
import {
    ArrowUpCircleIcon,
    LayoutDashboardIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CreateTaskForm } from "./tasks/create-task-form"
import paths from "@/paths"

const data = {
    user: {
        name: "andreb",
        email: "andreb@mobup.inc",
        avatar: "/avatar.jpeg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: paths.dashboard(),
            icon: LayoutDashboardIcon,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <>
            <Sidebar collapsible="offcanvas" {...props}>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className="data-[slot=sidebar-menu-button]:!p-1.5"
                            >
                                <a href="#">
                                    <ArrowUpCircleIcon className="h-5 w-5" />
                                    <span className="text-base font-semibold">Mobup.</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <NavMain items={data.navMain} />
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={data.user} />
                </SidebarFooter>
            </Sidebar>
            <CreateTaskForm />
        </>
    )
}
