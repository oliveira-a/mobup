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
import { useState } from "react"


export function CreateTaskCard(
    { 
        className,
        onCancelClick,
        onCreateClick,
     }: {
        className?: string | string[],
        onCancelClick: React.MouseEventHandler<HTMLButtonElement>,
        onCreateClick(title: string, summary: string, createdBy: string, tags: string[]): void,
    }) {
        const [title, setTitle] = useState('');
        const [summary, setSummary] = useState('');
        const [createdBy, setCreatedBy] = useState(''); 
        const [tags, setTags] = useState<string[]>([]);
    
        const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
        };
    
        const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setSummary(e.target.value);
        };
    
        const handleCreatedByChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setCreatedBy(e.target.value);
        };
    
        const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newTags = e.target.value.split(',').map(tag => tag.trim());
            setTags(newTags);
        };
    
        const handleCreateClick = () => {
            onCreateClick(createdBy, title, summary, tags)
        };

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
                            <Input
                                id="task-title"
                                placeholder="Your task's title"
                                value={title}
                                onChange={handleTitleChange}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="task-summary">Summary</Label>
                            <Textarea
                                id="task-summary"
                                placeholder="Add a short summary about what you'll be working on."
                                value={summary}
                                onChange={handleSummaryChange}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="task-createdBy">Created By</Label>
                            <Input
                                id="task-createdBy"
                                placeholder="Your name"
                                value={createdBy}
                                onChange={handleCreatedByChange}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="task-tags">Tags</Label>
                            <Input
                                id="task-tags"
                                placeholder="Add tags, separated by commas"
                                value={tags.join(', ')}
                                onChange={handleTagsChange}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={onCancelClick} variant="outline">Cancel</Button>
                <Button onClick={handleCreateClick}>Create</Button>
            </CardFooter>
        </Card>
    )
}
