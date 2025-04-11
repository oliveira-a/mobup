import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Tag } from "./tag"

interface TaskCardProps {
    createdBy: string
    title: string
    summary: string
    tags: string[]
}

export function TaskCard(props: TaskCardProps) {
    return (
        <Card className={cn("w-[300px]", "m-3", "self-end")}>
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.summary}</CardDescription>
            </CardHeader>
            <CardFooter className={cn("text-sm", "flex", "flex-col")}>
                <div className="block">
                    <p>Created by <b>{props.createdBy}</b></p>
                </div>
                <div className={cn("block", "flex", "flex-wrap", "gap-2", "mt-2")}>
                    {
                        props.tags.map((tag, i) => (
                            <Tag key={i} name={tag} />
                        ))
                    }
                </div>
            </CardFooter>
        </Card>
    );
}
