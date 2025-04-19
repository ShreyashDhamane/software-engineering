import React from "react";

const UserDataSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Profile image placeholder */}
      <div className="relative inline-block justify-start bg-gray-600 rounded-full p-[1.5px]">
        <div className="w-[70px] h-[70px] rounded-full bg-gray-700" />
      </div>

      {/* Text placeholders (shimmer effect) */}
      <div className="mt-3 space-y-2">
        <div className="h-6 w-3/4 bg-gray-600 rounded" />
        <div className="h-4 w-1/2 bg-gray-600 rounded" />
        <div className="h-4 w-2/3 bg-gray-600 rounded" />
      </div>
    </div>
  );
};

export default UserDataSkeleton;
