import Image from "next/image";
import {
  getLikeTypeColor,
  getIconSource,
  getGroupHoverTextColor,
} from "@/utils/icons";
import cn from "@/utils/cn";
export default function IconText({
  src,
  width,
  height,
  alt,
  text,
  onClick = null,
  user_has_liked = false,
  like_type = null,
  theme = null,
  className = null,
  disabled = false,
}) {
  const likeTypeColor = getLikeTypeColor(user_has_liked, like_type, theme);
  const groupHoverTextColor = getGroupHoverTextColor(
    user_has_liked,
    like_type,
    theme
  );
  return (
    <button
      className={cn(
        "flex flex-1 p-2 my-3 mx-1 space-x-1 justify-center items-center rounded-md h-[35px] relative md:flex-col lg:flex-row  hover:bg-black hover:cursor-pointer ",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <Image
        src={getIconSource(src, user_has_liked, like_type)}
        width={user_has_liked ? 16 : width}
        height={user_has_liked ? 16 : height}
        alt={alt}
        className="object-fill "
      />
      <p
        className={cn(
          `hidden md:block text-sm font-semibold`,
          likeTypeColor,
          `group-hover:${groupHoverTextColor}`
        )}
      >
        {user_has_liked ? like_type : text}
      </p>
    </button>
  );
}
