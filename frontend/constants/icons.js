import { commentDark, likeDark, reportDark, repostDark } from "@/public/icons";

const icons = [
  { src: "/icons/likeli.svg", alt: "Like" },
  { src: "/icons/clap.svg", alt: "Clap" },
  { src: "/icons/support.svg", alt: "Support" },
  { src: "/icons/heart.svg", alt: "Heart" },
  { src: "/icons/bulb.svg", alt: "Bulb" },
  { src: "/icons/laugh.svg", alt: "Laugh" },
];

const iconsData = {
  like: {
    src: likeDark,
    width: 16,
    height: 16,
    alt: "Like",
    text: "Like",
  },
  comment: {
    src: commentDark,
    width: 16,
    height: 16,
    alt: "Comment",
    text: "Comment",
  },
  repost: {
    src: repostDark,
    width: 20,
    height: 20,
    alt: "Repost",
    text: "Repost",
  },
  report: {
    src: reportDark,
    width: 16,
    height: 16,
    alt: "Report",
    text: "Report",
  },
};

export { iconsData };

export default icons;
