import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"


export function CreateTaskCard({className} : { className?: string | string[]}) {
    return (
        <Card className={cn("w-[350px]", className)}>
            <CardHeader>
                <CardTitle>Create new Task</CardTitle>
                <CardDescription>Add a new task to the board so people can see what you&apos;re working on.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="task-title">Title</Label>
                            <Input id="task-title" placeholder="Your task's title" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="task-summary">Description</Label>
                            <Textarea id="task-summary" placeholder="Add a short summary about what you'll be working on." />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Create</Button>
            </CardFooter>
        </Card>
    )
}
