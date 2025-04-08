import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
interface TaskProps {
    createdBy: string
    title: string
    summary: string
    tags: string[]
}

export function Task(props: TaskProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.summary}</CardDescription>
            </CardHeader>
            <CardFooter>
                <p>Created by <b>{props.createdBy}</b></p>
            </CardFooter>
        </Card>
    );
}

