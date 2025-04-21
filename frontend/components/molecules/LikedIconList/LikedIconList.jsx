import Icon from "@/components/atom/Icon/Icon";
import likeli from "@/public/icons/likeli.svg";
import heart from "@/public/icons/heart.svg";
import laugh from "@/public/icons/laugh.svg";

export default function LikedIconList() {
  return (
    <div className="flex">
      <Icon src={likeli} width={16} height={16} alt="like" size="sm" />
      <Icon
        src={heart}
        width={16}
        height={16}
        alt="heart"
        size="sm"
        className="-ml-2 z-1"
      />
      <Icon
        src={laugh}
        width={16}
        height={16}
        alt="laugh"
        size="sm"
        className="-ml-2 z-2"
      />
    </div>
  );
}
