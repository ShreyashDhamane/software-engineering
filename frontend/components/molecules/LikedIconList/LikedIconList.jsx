import Icon from "@/components/atom/Icon/Icon";
import likeli from "@/public/icons/likeli.svg";
import heart from "@/public/icons/heart.svg";
import laugh from "@/public/icons/laugh.svg";
const icon = {
  width: 16,
  height: 16,
};
export default function LikedIconList() {
  return (
    <div className="flex">
      <Icon src={likeli} width={16} height={16} alt="like" size="sm" />
      <Icon
        src={heart}
        width={icon.width}
        height={icon.width}
        alt="heart"
        size="sm"
        className="-ml-2 z-1"
      />
      <Icon
        src={laugh}
        width={icon.height}
        height={icon.height}
        alt="laugh"
        size="sm"
        className="-ml-2 z-2"
      />
    </div>
  );
}
