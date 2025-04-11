'use client'

import { useState, useActionState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Button
} from '@/components/ui/button'
import * as actions from '@/actions'
import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-label'
import { Textarea } from '../ui/textarea'
import { DialogDescription } from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { Toaster, toast } from 'sonner'

export const CreateTaskForm = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [state, action, pending] = useActionState(actions.createTask, {})

  // closes the modal after a successful submission
  useEffect(() => {
    if (state.type === 'success') {
      setModalOpen(false)
      toast(`Nice one, ${state.data.createdBy}! You task was been added successfully!`)
    }
  }, [state])

  return (
    <>
      {/* Your job: add the form inputs */}
      {/* Extra credit: show error validation under the right fields */}
      {/* Extra extra credit: show a toast when successful */}
      {/* Dialog */}
      <Dialog open={modalOpen} onOpenChange={(isOpen) => setModalOpen(isOpen)}>
        <DialogTrigger asChild>
          <Button variant="default" className={cn("fixed", "bottom-8", "right-8", "p-4", "rounded-full", "transition")}>
            Create Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form action={action}>
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>
              <DialogDescription>
                Add a new task so your teammates can pair up with you.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Label htmlFor="title" className="font-bold">Title:</Label>
              <Input id="title" name="title" type="text" placeholder="Add a new endpoint" />
              <Label htmlFor="title" className="font-bold">Summary:</Label>
              <Textarea id="summary" name=" summary" placeholder="Add a short description of your task" />
              <Label htmlFor="createdBy" className="font-bold">Created By:</Label>
              <Input id="creatdBy" name="createdBy" type="text" placeholder="John Doe" />
              <Label htmlFor="tags" className="font-bold">Tags:</Label>
              <Input id="tags" name="tags" type="text" placeholder="C#,.NET,APIM" />
            </div>
            <DialogFooter>
              <Button type='submit' disabled={pending}>Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  )
}