import { cn } from '@/lib/utils'

export function Tag({
  name,
  className,
  onClick,
}: {
  name: string
  className?: string
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={cn('bg-gray-100', 'rounded-xl', 'p-1', 'text-xs', className)}
    >
      <p>#{name}</p>
    </div>
  )
}
