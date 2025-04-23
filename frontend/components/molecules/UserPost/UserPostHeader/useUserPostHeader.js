"use client";
import { useNotification } from "@/app/custom-components/ToastComponent/NotificationContext";
import { apiDelete, apiPost } from "@/utils/fetch/fetch";
import throttle from "@/utils/throttle";
import { produce } from "immer";
import { useEffect, useRef, useState } from "react";

export default function useUserPostHeader(post_user_id, setPosts, post_id) {
  const [isFollowButtonDisabled, setIsFollowButtonDisabled] = useState(false);
  const [isPostOptionListVisible, setIsPostOptionListVisible] = useState(false);
  const [deletePostConfirmation, setDeletePostConfirmation] = useState(false);
  const [isDeleteInProgress, setIsDeleteInProgress] = useState(false);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const postOptionListRef = useRef(null);
  const { showError, showSuccess } = useNotification();

  // Move user retrieval inside the effect or handler functions
  // instead of at the top level with early returns
  const [userId, setUserId] = useState(null);

  // Use an effect to load the user ID once on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user")); // Retrieve the user from localStorage
      if (user) {
        setUserId(user.id);
      }
    }
  }, []);

  const throttledHandleOnFollow = throttle(async (val) => {
    try {
      // Check for user inside the function
      let user = null;
      if (typeof window !== "undefined") {
        user = JSON.parse(localStorage.getItem("user"));
      }
      if (!user) {
        showError("Please login to follow a user. User not found.");
        return;
      }

      setIsFollowButtonDisabled(true);

      setPosts(
        produce((draft) => {
          const post = draft.find((p) => p.user_id === post_user_id);
          if (post) {
            post.is_following_author = val;
          }
          return draft;
        })
      );

      await apiPost(`/forum/posts/follow/${post_user_id}/`, {
        user_id: user.id,
        follow: val,
      });
    } catch (e) {
      showError("Error following user");
      console.log(e);
    } finally {
      setIsFollowButtonDisabled(false);
    }
  }, 2000);

  const handleDeletePost = async () => {
    try {
      if (isDeleteInProgress) {
        showError("Delete in progress. Please wait.");
        return;
      }
      setIsDeleteInProgress(true);
      await apiDelete(`/forum/posts/${post_id}/delete/`);
      setPosts((prev) => prev.filter((post) => post.id !== post_id));
      showSuccess("Post deleted successfully");
    } catch (e) {
      showError("Error deleting post");
      console.log(e);
    } finally {
      setIsDeleteInProgress(false);
      setDeletePostConfirmation(false);
    }
  };

  const handleEditPostClick = () => {
    setIsPostDialogOpen(true);
    setIsPostOptionListVisible(false);
  };

  const handleDeletePostClick = () => {
    setDeletePostConfirmation(true);
    setIsPostOptionListVisible(false);
  };

  return {
    isFollowButtonDisabled,
    throttledHandleOnFollow,
    user_id: userId, // Return the state variable
    isPostOptionListVisible,
    setIsPostOptionListVisible,
    postOptionListRef,
    deletePostConfirmation,
    setDeletePostConfirmation,
    isDeleteInProgress,
    setIsDeleteInProgress,
    handleDeletePost,
    isPostDialogOpen,
    setIsPostDialogOpen,
    handleEditPostClick,
    handleDeletePostClick,
  };
}
