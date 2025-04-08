export function Tag({ name } : { name: string }) {
    return (
        <div className="bg-gray-100 rounded-xl p-1 text-xs">
            <p>#{name}</p>
        </div>
    )
}