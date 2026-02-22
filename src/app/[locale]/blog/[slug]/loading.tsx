export default function BlogPostLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="animate-pulse space-y-6">
        <div className="flex gap-2">
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-4 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
            <div className="h-6 w-32 bg-gray-200 rounded" />
          </div>
          <div className="h-12 w-3/4 bg-gray-200 rounded" />
          <div className="h-6 w-full bg-gray-200 rounded" />
        </div>
        <div className="h-[400px] w-full bg-gray-200 rounded-2xl" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
