"use client";
import { cn } from "@/lib/utils";
import useCustomTextInput from "./useCustomTextInput";

export default function CustomTextInput({
  content,
  setContent,
  placeholder,
  isLoading = false,
}) {
  const {
    editableDivRef,
    handleEditableDivInput,
    handleEditableDivOnClick,
    handleEditableDivFocus,
    handleEditableDivPaste,
    handleEditableDivKeyDown,
    handleEditableDivBlur,
  } = useCustomTextInput(content, setContent, placeholder);
  return (
    <div
      contentEditable={isLoading ? false : true}
      suppressContentEditableWarning={true}
      ref={editableDivRef}
      className={cn(
        "outline-none flex text-forum-subheading items-center pl-3",
        {
          "text-gray-400": content === "",
          "pt-2": content !== "",
        }
      )}
      onInput={handleEditableDivInput}
      onClick={handleEditableDivOnClick}
      onFocus={handleEditableDivFocus}
      onPaste={handleEditableDivPaste}
      onKeyDown={handleEditableDivKeyDown}
      onBlur={handleEditableDivBlur}
    >
      {content === "" ? placeholder : content}
    </div>
  );
}
