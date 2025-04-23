"use client";
import { useState } from "react";
import likeli from "@/public/icons/likeli.svg";
import clap from "@/public/icons/clap.svg";
import support from "@/public/icons/support.svg";
import heart from "@/public/icons/heart.svg";
import bulb from "@/public/icons/bulb.svg";
import laugh from "@/public/icons/laugh.svg";

const useLikeOptionList = (onClick) => {
  const [hoveredIcon, setHoveredIcon] = useState(null); // Track which icon is hovered

  // Icons data
  const icons = [
    { src: likeli, alt: "Like" },
    { src: clap, alt: "Clap" },
    { src: support, alt: "Support" },
    { src: heart, alt: "Heart" },
    { src: bulb, alt: "Bulb" },
    { src: laugh, alt: "Laugh" },
  ];

  const handleIconClick = (likeType) => {
    if (
      likeType &&
      typeof likeType === "object" &&
      likeType._reactName === "onClick"
    ) {
      console.warn("Received event object instead of like type string");
      return;
    }

    if (typeof likeType === "string") {
      onClick(likeType);
    }
  };

  return {
    hoveredIcon,
    setHoveredIcon,
    icons,
    handleIconClick, // Use our safe handler
  };
};

export default useLikeOptionList; // Ensure it's exported as default
