import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Tag } from "./tag"
  
interface TaskProps {
    createdBy: string
    title: string
    summary: string
    tags: string[]
    jiraTicketUrl: URL | null
}

export function Task(props: TaskProps) {
    const jiraTicket = {
        number: props.jiraTicketUrl?.toString().split('/').at(-1),
        url: props.jiraTicketUrl?.toString(),
    }

    return (
        <Card className={cn("w-[300px]", "m-3", "self-end")}>
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.summary}</CardDescription>
            </CardHeader>
            <CardFooter className={cn("text-sm", "flex", "flex-col")}>
                <div className="block">
                {
                    props.jiraTicketUrl == null ? 
                        <p>Created by <b>{props.createdBy}</b></p> :
                        <p>Created by <b>{props.createdBy}</b> | <a href={jiraTicket.url}>{jiraTicket.number}</a></p>
                }
                </div>
                <div className={cn("block", "flex", "flex-wrap", "gap-2")}>
                    {
                        props.tags.map((tag, i) => (
                            <Tag key={i} name={tag}/>
                        ))
                    }
                </div>
            </CardFooter>
        </Card>
    );
}
