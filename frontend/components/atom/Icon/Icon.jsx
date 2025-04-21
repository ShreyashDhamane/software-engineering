"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export default function Icon({
  onClick = () => {},
  src,
  width,
  height,
  alt,
  size,
  onMouseEnter = null,
  onMouseLeave = null,
  selected = null,
  tooltipText = "",
  className = "",
}) {
  const [isHovered, setIsHovered] = useState(false); // State to manage hover
  let baseClassName =
    "flex justify-center items-center rounded-full hover:cursor-pointer transition-all duration-200 inline-block";

  if (selected == null) {
    baseClassName = "hover:bg-bg-forum " + baseClassName;
    if (size === "sm") {
      baseClassName = "w-5 h-5 " + baseClassName;
    } else if (size === "md") {
      baseClassName = "w-7 h-7 " + baseClassName;
    } else if (size === "lg") {
      baseClassName = "w-10 h-10 " + baseClassName;
    } else if (size === "xl") {
      baseClassName = "w-14 h-14 " + baseClassName;
    } else if (size === "xl") {
      baseClassName = "w-18 h-18 " + baseClassName;
    }
  } else {
    if (selected) {
      // Only apply large size if no size is explicitly set
      if (!size) {
        baseClassName = "scale-110 z-3 w-20 h-20 " + baseClassName;
      } else {
        // use size-specific selected styles
        if (size === "md") {
          baseClassName = "scale-110 z-3 w-8 h-8 " + baseClassName;
        } else if (size === "sm") {
          baseClassName = "scale-110 z-3 w-6 h-6 " + baseClassName;
        } else {
          baseClassName = "scale-110 z-3 w-10 h-10 " + baseClassName;
        }
      }
    } else {
      baseClassName = "w-8 h-8 " + baseClassName;
    }
  }

  // Handle click safely - prevent passing the event object
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling if needed

    // Call onClick with the alt text instead of the event
    // This ensures we pass a string not an event object
    if (onClick) {
      onClick(alt);
    }
  };

  const handleOnMouseEnter = () => {
    setIsHovered(true);
    if (onMouseEnter) {
      onMouseEnter();
    }
  };

  return (
    <div
      onClick={handleClick} // Use our safe handler instead of directly passing onClick
      className={cn(baseClassName, "relative", className)} // tooltiptext positioned relative to icon
      onMouseEnter={() => {}}
      onMouseLeave={handleOnMouseEnter}
    >
      <Image
        src={src}
        width={selected != null ? (selected ? 80 : 40) : width ?? 40}
        height={selected != null ? (selected ? 80 : 40) : height ?? 40}
        alt={alt}
      />

      {/* Tooltip */}
      {isHovered && tooltipText && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded-full whitespace-nowrap z-50 shadow-md">
          {tooltipText}
        </div>
      )}
    </div>
  );
}
