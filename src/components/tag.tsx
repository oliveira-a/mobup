export function Tag({ name, classValue }: { name: string, classValue: string }) {
  return (
   <div className={'bg-gray-100 rounded-xl p-1 text-xs '+classValue}>
      <p>#{name}</p>
    </div>
  )
}
