export interface Task {
  id: string
  owner: TaskOwner
  title: string
  summary: string
  tags: string[]
}

export interface TaskOwner {
  id: string
  name: string
}

export type User = {
  id: string
  name: string
  email: string
  password: string
}
