'use client'

import { TaskCard } from '@/components/task-card'
import { Task } from '@/lib/dtos'
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
  SheetTitle,
  SheetFooter
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import * as actions from '@/actions'
import { toast } from 'sonner'

interface TasksDashboardProps {
  tasks: Task[]
}

export function TasksDashboard({ tasks }: TasksDashboardProps) {
  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const [editingTitle, setEditingTitle] = useState(false)
  const [editingSummary, setEditingSummary] = useState(false)

  const handleEdit = (task: Task) => {
    setSelectedTask(task)
    setOpen(true)
  }

  return (
    <>
    <div className='flex flex-row flex-wrap z-1'>
      {tasks.map((t, i) => (
        <TaskCard key={i} task={t} onTitleClick={handleEdit} />
      ))}
    </div>

    {/* This is the edit window panel for the selected task. */}
    <Sheet open={open} onOpenChange={setOpen}>
    <SheetContent>
      <SheetHeader className="mt-5">
        <form>
        {editingTitle ?
          <Textarea
            name="title"
            value={selectedTask?.title ?? ""}
            onChange={(e) => {
              setSelectedTask({ ...selectedTask, title: e.target.value })
            }}
            onBlur={() => {
              setEditingTitle(false)
            }}/>
            : <SheetTitle onClick={() => setEditingTitle(true)} className="hover:border-2 border-black rounded">
            {selectedTask?.title ?? ""}
          </SheetTitle>
        }
        {editingSummary ?
          <Textarea
            name="title"
            value={selectedTask?.summary ?? ""}
            onChange={(e) => {
              setSelectedTask({ ...selectedTask, summary: e.target.value })
            }}
            onBlur={() => {
              setEditingSummary(false)
            }}/>
          : <SheetDescription
              onClick={() => setEditingSummary(true)}
              className="mt-5 hover:border-2 border-black rounded">
            {selectedTask?.summary ?? ""}
          </SheetDescription>
        }
        </form>
      </SheetHeader>
      {/* todo: add a comment section here. */}
    <SheetFooter>
      <div className="flex flex-row gap-2 self-end">
      <Button variant="ghost">Save</Button>
      <Button onClick={async () => {
        const ok = await actions.deleteTask(selectedTask.id)
        if (!ok) {
          toast(`An error ocurred when deleting task ${task.id}.`)
        } else {
          toast(`Task ${selectedTask.id} deleted!`)
        }

        setOpen(false)
      }}>Delete</Button>
      </div>
    </SheetFooter>
    </SheetContent>
  </Sheet>
  </>
  )
}
