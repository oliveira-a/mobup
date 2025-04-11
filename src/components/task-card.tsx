'use client'

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Tag } from "./tag"
import { Button } from "./ui/button"
import * as actions from "@/actions";
import { Task } from "@/lib/dtos"

interface TaskCardProps {
    task: Task
}

export function TaskCard(props: TaskCardProps) {
    return (
        <Card className="w-[300px] m-3 self-end">
            <CardHeader>
                <div className="flex flex-row justify-between items-start text-sm">
                    <CardTitle>{props.task.title}</CardTitle>
                    <Button variant="ghost" className="w-6 h-6 p-1" onClick={() => (actions.deleteTask(props.task.id))}>🗑️</Button>
                </div>
                <CardDescription>{props.task.summary}</CardDescription>
            </CardHeader>
            <CardFooter className={cn("text-sm", "flex", "flex-col")}>
                <div className="block">
                    <p>Created by <b>{props.task.createdby}</b></p>
                </div>
                <div className={cn("block", "flex", "flex-wrap", "gap-2", "mt-2")}>
                    {
                        props.task.tags.map((tag, i) => (
                            <Tag key={i} name={tag} />
                        ))
                    }
                </div>
            </CardFooter>
        </Card>
    );
}
