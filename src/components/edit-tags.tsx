export function EditTags() {
  return (
    <FormField
      control={form.control}
      name='tags'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <div className='flex gap-2'>
            <FormControl>
              <Input
                placeholder='Add a tag'
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
              />
            </FormControl>
            <Button
              type='button'
              variant='secondary'
              onClick={addTag}
            >
              Add
            </Button>
          </div>
          <FormDescription>
            Add relevant tags to categorize your task.
          </FormDescription>
          <FormMessage />

          <div className='flex flex-wrap gap-2 mt-3'>
            {field.value.map((tag) => (
              <div
                key={tag}
                className='flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm'
              >
                {tag}
                <button
                  type='button'
                  onClick={() => removeTag(tag)}
                  className='text-secondary-foreground/70 hover:text-secondary-foreground'
                >
                  <X size={14} />
                  <span className='sr-only'>Remove {tag} tag</span>
                </button>
              </div>
            ))}
          </div>
        </FormItem>
      )}
    />
  )
}
