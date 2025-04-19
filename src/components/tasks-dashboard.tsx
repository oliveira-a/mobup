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
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useState, useEffect, useRef } from 'react'
import * as actions from '@/actions'
import { toast } from 'sonner'
import { Tag } from '@/components/tag'
import { cn } from '@/lib/utils'

interface TasksDashboardProps {
  tasks: Task[]
}

export function TasksDashboard({ tasks }: TasksDashboardProps) {
  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const [editingTitle, setEditingTitle] = useState(false)
  const [editingSummary, setEditingSummary] = useState(false)
  const [editingTags, setEditingTags] = useState(false)

  const setFocus = (el) => {
    el.focus()
    // moves the cursor to the end
    el.setSelectionRange(el.value.length, el.value.length)
  }

  const titleRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (editingTitle && titleRef.current) {
      setFocus(titleRef.current)
    }
  }, [editingTitle])

  const summaryRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (editingSummary && summaryRef.current) {
      setFocus(summaryRef.current)
    }
  }, [editingSummary])

  const tagsRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (editingTags && tagsRef.current) {
      setFocus(tagsRef.current)
    }
  }, [editingTags])

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
          <SheetHeader className='mt-5'>
            <SheetTitle>Task {selectedTask?.id ?? ''}</SheetTitle>
            <form>
              {editingTitle ? (
                <Textarea
                  ref={titleRef}
                  name='title'
                  value={selectedTask?.title ?? ''}
                  onChange={(e) => {
                    setSelectedTask({ ...selectedTask, title: e.target.value })
                  }}
                  onBlur={() => setEditingTitle(false)}
                />
              ) : (
                <SheetTitle
                  onClick={() => setEditingTitle(true)}
                  className='hover:border-2 border-black rounded'
                >
                  {selectedTask?.title ?? ''}
                </SheetTitle>
              )}
              {editingSummary ? (
                <Textarea
                  ref={summaryRef}
                  name='title'
                  value={selectedTask?.summary ?? ''}
                  onChange={(e) => {
                    setSelectedTask({
                      ...selectedTask,
                      summary: e.target.value,
                    })
                  }}
                  onBlur={() => setEditingSummary(false)}
                />
              ) : (
                <SheetDescription
                  onClick={() => setEditingSummary(true)}
                  className='mt-5 hover:border-2 border-black rounded'
                >
                  {selectedTask?.summary ?? ''}
                </SheetDescription>
              )}
              {editingTags ? (
                <div>
                  <Textarea
                    id='tags'
                    ref={tagsRef}
                    name='tags'
                    value={
                      selectedTask?.tags == null
                        ? ''
                        : selectedTask?.tags.join(',')
                    }
                    onChange={(e) => {
                      setSelectedTask({
                        ...selectedTask,
                        tags: e.target.value.split(','),
                      })
                    }}
                    onBlur={() => setEditingTags(false)}
                  />
                  <Label className='mt-2' htmlFor='tags'>
                    Add tags, using ',' as a separator
                  </Label>
                </div>
              ) : (
                <div className='block flex flex-wrap gap-2 mt-4'>
                  {selectedTask?.tags.map((tag, i) => (
                    <Tag
                      key={i}
                      name={tag}
                      className='hover:border'
                      onClick={() => setEditingTags(true)}
                    />
                  ))}
                </div>
              )}
            </form>
          </SheetHeader>
          {/* todo: add a comment section here. */}
          <SheetFooter>
            <div className='flex flex-row gap-2 self-end'>
              <Button>Save</Button>
              <Button
                variant='ghost'
                onClick={async () => {
                  const ok = await actions.deleteTask(selectedTask.id)
                  if (!ok) {
                    toast(`An error ocurred when deleting task ${task.id}.`)
                  } else {
                    toast(`Task ${selectedTask.id} deleted!`)
                  }
                  setOpen(false)
                }}
              >
                Delete
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
