export function CardSkeleton() {
  return (
    <div className="rounded-card overflow-hidden bg-white shadow-card">
      <div className="skeleton h-48 w-full" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-2/3" />
      </div>
    </div>
  )
}

export function ActivityCardSkeleton() {
  return <CardSkeleton />
}

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="skeleton h-64 rounded-card" />
      ))}
    </div>
  )
}
