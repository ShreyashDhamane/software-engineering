"use client";
import PostCommentInput from "@/components/molecules/PostCommentInput/PostCommentInput";
import PostComments from "@/components/molecules/PostComments/PostComments";
import { useState } from "react";

export default function UserPostCommentSection({
  post_id,
  setCommentsCount,
  is_repost,
  original_post_id,
}) {
  const [comments, setComments] = useState([]);
  console.log("UserPostCommentSection comments", comments);
  console.log("original_post_id", original_post_id);
  console.log("post_id", post_id);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <PostCommentInput
          post_id={post_id}
          setCommentsCount={setCommentsCount}
          setComments={setComments}
          is_repost={is_repost}
          original_post_id={original_post_id}
          is_reply={false}
          parent_comment_id={0}
          setRepliesCount={null}
        />
        <PostComments
          post_id={post_id}
          comments={comments}
          setComments={setComments}
          setCommentsCount={setCommentsCount}
          is_repost={is_repost}
          original_post_id={original_post_id}
          level={1}
        />
      </div>
    </div>
  );
}
