"use client";
import IconText from "@/components/molecules/IconText/IconText";
import LikeIconTextWithTooltip from "@/components/molecules/LikeIconTextWithTooltip/LikeIconTextWithTooltip";
import { iconsData } from "@/constants/icons";
import usePostFooterIconList from "./usePostFooterIconList";
import { useEffect } from "react";

const PostFooterIconList = ({
  handleClickOnComment,
  setLikesCount,
  setShowReportUserDialog,
  setPosts,
  post,
  isReported,
  setIsReported,
}) => {
  const {
    userHasLiked,
    setUserHasLiked,
    likeType,
    setLikeType,
    handleRepost,
    handleReportPostClick,
  } = usePostFooterIconList(post, setPosts, setShowReportUserDialog);

  useEffect(() => {
    setIsReported(post.is_reported);
  }, [post.is_reported, setIsReported]);

  return (
    <div className="flex flex-1 relative">
      <div className="flex-1 group ">
        {/* like option list */}
        <LikeIconTextWithTooltip
          iconData={iconsData.like}
          post_id={post.id}
          userHasLiked={userHasLiked}
          setUserHasLiked={setUserHasLiked}
          likeType={likeType}
          setLikeType={setLikeType}
          setLikesCount={setLikesCount}
          is_repost={post.is_repost}
          original_post_id={post.original_post_id}
        />
      </div>
      <div
        className="flex-1 flex justify-center items-center"
        onClick={handleClickOnComment}
      >
        <IconText
          src={iconsData.comment.src}
          width={iconsData.comment.width}
          height={iconsData.comment.height}
          alt={iconsData.comment.alt}
          text={iconsData.comment.text}
        />
      </div>
      <div className="flex-1" onClick={handleRepost}>
        <IconText
          src={iconsData.repost.src}
          width={iconsData.repost.width}
          height={iconsData.repost.height}
          alt={iconsData.repost.alt}
          text={iconsData.repost.text}
        />
      </div>
      <div className="flex-1" onClick={handleReportPostClick}>
        <IconText
          src={iconsData.report.src}
          width={iconsData.report.width}
          height={iconsData.report.height}
          alt={iconsData.report.alt}
          text={isReported ? "Reported" : iconsData.report.text}
          theme={isReported ? "red" : null}
        />
      </div>
    </div>
  );
};

export default PostFooterIconList;
