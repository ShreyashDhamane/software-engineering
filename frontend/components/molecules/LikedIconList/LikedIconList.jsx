import Icon from "@/components/atom/Icon/Icon";
import likeli from "@/public/icons/likeli.svg";
import heart from "@/public/icons/heart.svg";
import laugh from "@/public/icons/laugh.svg";

export default function LikedIconList() {
  return (
    <div className="flex">
      <div>
        <Icon src={likeli} width={16} height={16} alt="like" size="sm" />
      </div>

      <div className="-ml-2 z-1">
        <Icon src={heart} width={16} height={16} alt="heart" size="sm" />
      </div>

      <div className="-ml-2 z-2">
        <Icon src={laugh} width={16} height={16} alt="laugh" size="sm" />
      </div>
    </div>
  );
}
