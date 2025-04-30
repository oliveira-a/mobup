import * as actions from '@/actions/getTaskWithRelationsById'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const task = await actions.getTaskWithRelationsById(Number(id))

  return (
    <Card className='ml-50 mr-50'>
      <CardHeader>
        <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-2xl'>Task #{task.id}</h1>
        <CardTitle className='text-xl font-bold'>{task.title}</CardTitle>
        <CardDescription>by {task.user.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className='text-sm font-medium text-muted-foreground mb-2'>
            Summary
          </h3>
          <p>{task.summary}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div>
          <h3 className='text-sm font-medium text-muted-foreground mb-2'>
            Tags
          </h3>
          <div className='flex flex-wrap gap-2'>
            {task.tags.map((tag) => (
              <Badge
                key={tag.id}
                variant='secondary'
                className='flex items-center gap-1'
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
