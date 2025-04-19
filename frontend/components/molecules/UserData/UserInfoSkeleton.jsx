import React from "react";

const UserInfoSkeleton = () => {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-5 w-full bg-gray-600 rounded"></div>
      <div className="h-5 w-full bg-gray-600 rounded"></div>
      <div className="h-5 w-full bg-gray-600 rounded"></div>
      <div className="h-5 w-full bg-gray-600 rounded"></div>
    </div>
  );
};

export default UserInfoSkeleton;
