export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 animate-pulse rounded bg-elevated" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-lg border border-line bg-elevated" />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-lg border border-line bg-elevated" />
    </div>
  );
}
