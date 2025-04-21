"use client";
import CommentButton from "@/components/atom/CommentButton/CommentButton";
import CustomTextInput from "@/components/atom/CustomTextInput/CustomeTextInput";
import Icon from "@/components/atom/Icon/Icon";
import usePostCommentInput from "@/components/molecules/PostCommentInput/usePostCommentInput";
import EmojiPicker from "emoji-picker-react";
import emoji from "@/public/icons/emoji.svg";
import { cn } from "@/lib/utils";
export default function PostCommentInput({
  post_id,
  setCommentsCount,
  setComments,
  is_repost,
  original_post_id,
  is_reply = true,
  parent_comment_id = null,
  setRepliesCount = null,
  initialContent = "",
  isEdit = false,
  setIsInputVisible = null,
  buttonName = "Comment",
}) {
  const {
    handleCommentSubmit,
    commentContent,
    setCommentContent,
    emojiPickerRef,
    showEmojiPicker,
    handleClickOnEmojiPicker,
    handleOnEmojiClick,
    isButtonDisabled,
    isLoading,
    handleCommentButtonClick,
  } = usePostCommentInput(
    post_id,
    setCommentsCount,
    setComments,
    is_repost,
    original_post_id,
    is_reply,
    parent_comment_id,
    setRepliesCount,
    initialContent,
    isEdit,
    setIsInputVisible
  );

  const getInputButtonText = () => {
    if (isEdit && isLoading) return "Editing...";
    if (isEdit && !isLoading) return "Edit";
    if (!isEdit && isLoading) return "Submitting...";
    return buttonName;
  };

  return (
    <div
      className={cn(
        `flex justify-between text-sm mx-1 mb-4 border-light relative`,
        {
          "flex-col rounded-3xl": commentContent !== "",
          "rounded-full": commentContent === "",
        }
      )}
    >
      {showEmojiPicker && (
        <div className="absolute bottom-16 right-0" ref={emojiPickerRef}>
          <EmojiPicker
            height={400}
            onEmojiClick={(emojiObject) =>
              handleOnEmojiClick(emojiObject, setCommentContent)
            }
            theme="dark"
          />
        </div>
      )}

      <CustomTextInput
        content={commentContent}
        setContent={setCommentContent}
        placeholder={"Add a comment..."}
        isLoading={isLoading}
      />

      <div className="flex justify-between">
        <Icon
          onClick={handleClickOnEmojiPicker}
          src={emoji}
          width={20}
          height={20}
          alt="Image Picker"
          size={"lg"}
        />
        {commentContent !== "" && (
          <div>
            <CommentButton
              onClick={handleCommentSubmit}
              disabled={isButtonDisabled || isLoading} // Disable during API call or loading
              aria-disabled={isButtonDisabled || isLoading} // Accessibility
            >
              {getInputButtonText()}
            </CommentButton>
            {isEdit && (
              <CommentButton theme={"red"} onClick={handleCommentButtonClick}>
                Cancel
              </CommentButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
