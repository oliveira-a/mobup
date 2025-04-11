'use client'

import { useActionState, useEffect, SetStateAction, Dispatch } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Toaster, toast } from 'sonner'

type CreateTaskFormProps = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateTaskForm = ({ modalOpen, setModalOpen }: CreateTaskFormProps) => {
  const [state, action, pending] = useActionState(actions.createTask, {})

  useEffect(() => {
    if (state.type === 'success') {
      setModalOpen(false)
      toast(`Nice one, ${state.data.createdby}! Your task was been added successfully!`)
    }
  }, [state, setModalOpen])

  return (
    <>
      {/* Your job: add the form inputs */}
      {/* Extra credit: show error validation under the right fields */}
      {/* Extra extra credit: show a toast when successful */}
      {/* Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <form action={action}>
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>
              <DialogDescription>
                Add a new task so your teammates can pair up with you.
              </DialogDescription>
            </DialogHeader>
            <div>
              <div className="mt-3">
                <Label htmlFor="title" className="font-bold text-sm">Title:</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  className={state.errors?.title ? "bg-red-100" : ""}
                  placeholder="Add a new endpoint"
                />
                {state.errors?.title ? <p className="text-red-500 text-xs">{state.errors?.title}</p> : ""}
              </div>

              <div className="mt-3">
                <Label htmlFor="summary" className="font-bold text-sm">Summary:</Label>
                <Textarea
                  id="summary"
                  name="summary"
                  placeholder="Add a short description of your task"
                  className={state.errors?.summary ? "bg-red-100" : ""}
                />
                {state.errors?.summary ? <p className="text-red-500 text-xs">{state.errors?.summary}</p> : ""}
              </div>

              <div className="mt-3">
                <Label htmlFor="createdBy" className="font-bold text-sm">Created By:</Label>
                <Input
                  id="creatdBy"
                  name="createdBy"
                  type="text"
                  className={state.errors?.title ? "bg-red-100" : ""}
                  placeholder="John Doe"
                />
                {state.errors?.createdBy ? <p className="text-red-500 text-xs">{state.errors?.createdBy}</p> : ""}
              </div>

              <div className="mt-3 mb-3">
                <Label htmlFor="tags" className="font-bold text-sm">Tags:</Label>
                <Input
                  id="tags"
                  name="tags"
                  type="text"
                  className={state.errors?.title ? "bg-red-100" : ""}
                  placeholder="C#,.NET,Next.js"
                />
                {state.errors?.tags ? <p className="text-red-500 text-xs">{state.errors?.tags}</p> : ""}
              </div>
            </div>
            <DialogFooter>
              <Button type='submit' disabled={pending}>Create</Button>
            </DialogFooter>
            {/*{state.type === 'success' ? toast('nice') : ""}*/}
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  )
}