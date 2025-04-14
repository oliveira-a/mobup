export interface Task {
  id: string,
  createdby: string,
  title: string,
  summary: string,
  tags: string[]
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
