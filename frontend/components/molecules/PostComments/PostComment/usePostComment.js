"use client";
import { useRef, useState } from "react";
import { useNotification } from "@/app/custom-components/ToastComponent/NotificationContext";
import { apiPost } from "@/utils/fetch/fetch";
import reportCategories from "@/constants/reportCategories";

const likeTypes = ["Like", "Clap", "Support", "Heart", "Bulb", "Laugh"];

export default function usePostComment(
  comment,
  post_id,
  original_post_id,
  is_repost
) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [userHasLiked, setUserHasLiked] = useState(comment.user_has_liked);
  const [likeType, setLikeType] = useState(comment.like_type);
  const [likesCount, setLikesCount] = useState(comment.likes_count);
  const [showCommentReply, setShowCommentReply] = useState(false);
  const [showCommentReplyInput, setShowCommentReplyInput] = useState(false);
  const [repliesCount, setRepliesCount] = useState(comment.replies_count || 0);
  const [replies, setReplies] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEditCommentVisible, setIsEditCommentVisible] = useState(false);
  const [isCommentOptionListVisible, setIsCommentOptionListVisible] =
    useState(false);
  const [showReportCategoryDialog, setShowReportCategoryDialog] =
    useState(false);
  const [reportCategorySelectedIndex, setReportCategorySelectedIndex] =
    useState(null);
  const { showError, showSuccess } = useNotification(); // Notification context to show error messages
  const [isReportedCommentLoading, setIsReportedCommentLoading] =
    useState(false);

  const hoverTimeoutRef2 = useRef(null);
  const dropdownRef = useRef(null);
  const reportCategoryDialogRef = useRef(null);

  // const
  const handleMouseEnter = () => {
    // Clear any existing timeout to avoid hiding the tooltip prematurely
    if (hoverTimeoutRef2.current) {
      clearTimeout(hoverTimeoutRef2.current);
    }
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    // Set a timeout to hide the tooltip after 0.5 seconds
    hoverTimeoutRef2.current = setTimeout(() => {
      setTooltipVisible(false);
    }, 100); // 500ms = 0.5 seconds
  };

  const throttledHandleOnLikeComment = async (like_type) => {
    try {
      // Check if the button is disabled
      if (isDisabled) {
        showError("Please wait before liking again.");
        return;
      }
      // Disable the button for 2 seconds
      setIsDisabled(true);
      // return;
      let userHasLiked2 = null;
      if (!userHasLiked && likeTypes.includes(like_type)) {
        setLikesCount((prevCount) => prevCount + 1);
        setUserHasLiked(true);
        userHasLiked2 = true;
        setLikeType(like_type);
      } else if (
        userHasLiked &&
        likeTypes.includes(like_type) &&
        likeType !== like_type
      ) {
        setLikeType(like_type);
        userHasLiked2 = true;
      } else if (userHasLiked && likeType === like_type) {
        setLikesCount((prevCount) => prevCount - 1);
        setUserHasLiked(false);
        userHasLiked2 = false;
      }
      setTooltipVisible(false);
      let userString = null;
      if (typeof window !== "undefined") {
        userString = localStorage.getItem("user"); // Retrieve the string
      }

      let user = null;
      if (userString) {
        user = JSON.parse(userString); // Parse the string into a JSON object
        // Use the JSON object
      } else {
        showError("Please login to like the post. User not found.");
        console.error("No user data found in localStorage");
      }

      if (!user) {
        showError("Please login to like the post. User not found.");
        return;
      }

      const response = await apiPost(
        `/forum/posts/comments/${comment.id}/like/`,
        {
          is_liked: userHasLiked2,
          user_id: user.id,
          like_type: like_type,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error(response.message || "Failed to like the post");
      }
      // Hide the tooltip after liking
    } catch (error) {
      showError("Error: Check console for details.");
      console.error("Error liking the post:", error);
    } finally {
      // Re-enable the button after 2 seconds
      setTimeout(() => {
        setIsDisabled(false);
      }, 2000);
    }
  }; // Debounce for 2 seconds

  const handleReportComment = async () => {
    //api is /api/forum/posts/comment/report
    //it takes the user_id, comment_id, and reason for reporting
    try {
      setIsReportedCommentLoading(true);
      let user = null;
      if (typeof window !== "undefined") {
        user = JSON.parse(localStorage.getItem("user"));
      }
      if (!user) {
        showError("Please login to report a comment. User not found.");
        return;
      }
      await apiPost(
        `/forum/posts/comment/report/`,
        {
          user_id: user.id,
          comment_id: comment.id,
          reason: reportCategories[reportCategorySelectedIndex],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      showSuccess("Comment reported successfully");
    } catch (error) {
      if (error.message === "Error: User Already Reported This Comment.") {
        showError("You have already reported this comment.");
        return;
      }
      showError("Error reporting comment");
      console.log(error.message);
    } finally {
      setShowReportCategoryDialog(false);
      setIsReportedCommentLoading(false);
      setReportCategorySelectedIndex(null);
    }
  };

  return {
    isTooltipVisible,
    handleMouseEnter,
    handleMouseLeave,
    throttledHandleOnLikeComment,
    likesCount,
    userHasLiked,
    likeType,
    repliesCount,
    showCommentReply,
    setShowCommentReply,
    replies,
    setReplies,
    showCommentReplyInput,
    setShowCommentReplyInput,
    setRepliesCount,
    isCommentOptionListVisible,
    setIsCommentOptionListVisible,
    showReportCategoryDialog,
    setShowReportCategoryDialog,
    reportCategorySelectedIndex,
    setReportCategorySelectedIndex,
    dropdownRef,
    reportCategoryDialogRef,
    handleReportComment,
    isReportedCommentLoading,
    isEditCommentVisible,
    setIsEditCommentVisible,
    hoverTimeoutRef2,
  };
}
