export default function ProductCardSkeleton() {
  return (
    <div className="w-full rounded-xl border border-gray-300 p-4 animate-pulse bg-white">
      {/* صورة */}
      <div className="w-full h-40 bg-gray-500 rounded-md"></div>

      <div className="mt-4 space-y-3">
        {/* عنوان */}
        <div className="h-3 w-3/4 rounded bg-gray-500"></div>

        {/* سطرين */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-3 bg-gray-500 rounded"></div>
          <div className="col-span-1 h-3 bg-gray-500 rounded"></div>
        </div>

        {/* السعر */}
        <div className="h-3 w-1/2 bg-gray-500 rounded"></div>

        {/* زر */}
        <div className="h-10 bg-gray-500 rounded-md mt-3"></div>
        <div className="h-10 bg-gray-500 rounded-md mt-3"></div>
      </div>
    </div>
  );
}
