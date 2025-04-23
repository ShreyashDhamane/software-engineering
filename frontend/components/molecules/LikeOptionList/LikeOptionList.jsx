"use client";
import Icon from "@/components/atom/Icon/Icon";
import useLikeOptionList from "./useLikeOptionList";
import { cn } from "@/lib/utils";

export default function LikeOptionList({ onClick }) {
  const { hoveredIcon, setHoveredIcon, icons, handleIconClick } =
    useLikeOptionList(onClick);

  // Create a handler that ensures we pass the correct like type

  return (
    <div
      className={cn(
        "flex bg-bg-post rounded-full justify-center items-center",
        {
          "max-h-12": hoveredIcon != null,
          "max-h-14": hoveredIcon == null,
        }
      )}
    >
      {icons.map((icon, index) => (
        <Icon
          key={index}
          selected={hoveredIcon != null ? hoveredIcon == index : null}
          src={icon.src}
          width={50}
          height={50}
          alt={icon.alt}
          size="xl"
          onMouseEnter={() => setHoveredIcon(index)}
          onMouseLeave={() => setHoveredIcon(null)}
          tooltipText={icon.alt}
          onClick={handleIconClick} // Use our safe handler
        />
      ))}
    </div>
  );
}
