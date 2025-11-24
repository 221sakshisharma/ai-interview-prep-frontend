const SkeletonLoader = () => {
  return (
    <div className="space-y-6 w-full">

      {/* Group 1 */}
      <div className="space-y-3">
        <div className="h-4 w-3/4 rounded-md skeleton-shimmer"></div>
        <div className="h-4 w-full rounded-md skeleton-shimmer"></div>
        <div className="h-4 w-5/6 rounded-md skeleton-shimmer"></div>
      </div>

      {/* Highlighted block */}
      <div className="p-4 rounded-md bg-gray-100 space-y-3">
        <div className="h-4 w-4/5 rounded-md skeleton-shimmer"></div>
        <div className="h-4 w-5/6 rounded-md skeleton-shimmer"></div>
        <div className="h-4 w-2/3 rounded-md skeleton-shimmer"></div>
      </div>

      {/* Group 2 */}
      <div className="space-y-3">
        <div className="h-4 w-full rounded-md skeleton-shimmer"></div>
        <div className="h-4 w-3/4 rounded-md skeleton-shimmer"></div>
        <div className="h-4 w-5/6 rounded-md skeleton-shimmer"></div>
        <div className="h-4 w-4/6 rounded-md skeleton-shimmer"></div>
      </div>

      {/* Highlighted block 2 */}
      <div className="p-4 rounded-md bg-gray-100 space-y-3">
        <div className="h-4 w-4/5 rounded-md skeleton-shimmer"></div>
        <div className="h-4 w-3/4 rounded-md skeleton-shimmer"></div>
      </div>

      {/* More lines */}
      <div className="space-y-3">
        <div className="h-4 w-5/6 rounded-md skeleton-shimmer"></div>
        <div className="h-4 w-4/6 rounded-md skeleton-shimmer"></div>
        <div className="h-4 w-full rounded-md skeleton-shimmer"></div>
      </div>

    </div>
  );
};

export default SkeletonLoader;
