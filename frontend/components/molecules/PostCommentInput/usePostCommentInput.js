"use client";
import { useEmojiPicker } from "@/hooks/useEmojiPicker";
import { useState } from "react";
import { apiPost } from "@/utils/fetch/fetch";
import { useNotification } from "@/app/custom-components/ToastComponent/NotificationContext";
import { produce } from "immer";

const maxCommentLength = 400; // Maximum comment length
export default function usePostCommentInput(
  post_id,
  setCommentsCount,
  setComments,
  is_repost,
  original_post_id,
  is_reply = false,
  parent_comment_id = null,
  setRepliesCount = null,
  initialContent = "",
  isEdit = false,
  setIsInputVisible = null
) {
  const {
    emojiPickerRef,
    showEmojiPicker,
    handleClickOnEmojiPicker,
    handleOnEmojiClick,
  } = useEmojiPicker();

  const [commentContent, setCommentContent] = useState(initialContent); // State for comment content
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Disable button during API call
  const [isLoading, setIsLoading] = useState(false); // Loading state for visual feedback
  const { showError, showSuccess } = useNotification();

  const handleCommentSubmitValidation = () => {
    if (commentContent.trim() === "") {
      showError("Please enter a comment, cannot be empty.");
      return false;
    }

    if (commentContent.length > maxCommentLength) {
      showError(
        `Comment is too long. Maximum length is ${maxCommentLength} characters.`
      );
      return false;
    }
    return true;
  };

  const getUser = () => {
    let userString = null;
    if (typeof window !== "undefined") {
      userString = localStorage.getItem("user"); // Retrieve the user from localStorage
    }
    let user = null;
    if (userString) {
      user = JSON.parse(userString); // Parse the user object
    } else {
      showError("Please login to comment. User not found.");
    }

    if (!user) {
      showError("Please login to comment. User not found.");
      return;
    }

    return user;
  };

  const handleCommentSubmitSuccess = (response, user) => {
    showSuccess(`Comment ${isEdit ? "edited" : "submitted"} successfully`);

    //type of setRepliesCount check

    const newComment = {
      content: commentContent,
      date_created: new Date().toISOString(),
      id: isEdit ? parent_comment_id : response.id,
      post_id: post_id,
      is_reply: is_reply,
      parent_comment_id: parent_comment_id,
      user: {
        avatar_url: user?.avatar ? user.avatar : null,
        email: user?.email || "Unknown",
        first_name: user?.first_name || "Unknown",
        id: user?.id || 0,
        last_name: user?.last_name || "Unknown",
      },
    };

    if (!isEdit) {
      setComments(
        produce((draft) => {
          draft.unshift(newComment); // Add the new comment to the beginning of the array
        })
      );
      setCommentsCount((prev) => prev + 1);
    } else {
      setComments(
        produce((draft) => {
          const comment = draft.find(
            (comment) => comment.id === parent_comment_id
          );
          if (comment) {
            comment.content = commentContent; // Update the content of the found comment
          }
        })
      );
    }

    setCommentContent("");
    if (is_reply && typeof setRepliesCount === "function") {
      setRepliesCount((prev) => prev + 1); // Increment the replies count if it's a reply
    }
  };

  const handleCommentSubmit = async () => {
    // Input validation
    if (!handleCommentSubmitValidation()) return;

    try {
      setIsButtonDisabled(true); // Disable the button
      setIsLoading(true); // Show loading spinner

      const user = getUser();
      if (!user) return; // Ensure user is valid

      // Make the API call
      const response = await apiPost(
        `/forum/posts/${is_repost ? original_post_id : post_id}/comments/`,
        {
          content: commentContent,
          user_id: user.id,
          parent_comment_id: parent_comment_id,
          is_edit: isEdit,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      handleCommentSubmitSuccess(response, user); // Handle success response
    } catch (error) {
      console.log("Error submitting comment:", error);
      showError("Failed to submit comment. Please try again.");
    } finally {
      setIsButtonDisabled(false); // Re-enable the button
      setIsLoading(false); // Hide loading spinner
      if (isEdit) {
        setIsInputVisible(false); // Hide the input after editing
      }
    }
  };

  const handleCommentButtonClick = () => {
    setIsInputVisible(false);
    setCommentContent("");
  };

  return {
    handleCommentSubmit,
    commentContent,
    setCommentContent,
    emojiPickerRef,
    showEmojiPicker,
    handleClickOnEmojiPicker,
    handleOnEmojiClick,
    isButtonDisabled, // Expose the button disabled state
    isLoading, //
    handleCommentButtonClick,
  };
}
