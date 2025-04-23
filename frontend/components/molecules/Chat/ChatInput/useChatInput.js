"use client";
import { useRef, useState } from "react";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { useEmojiPicker } from "@/hooks/useEmojiPicker";
import { useNotification } from "@/app/custom-components/ToastComponent/NotificationContext";
import { apiPost } from "@/utils/fetch/fetch";
import { produce } from "immer";

const MAX_MESSAGE_LENGTH = 500; // Maximum message length
const DEFAULT_ROWS = 1; // Default number of rows for the textarea
const MAX_ROWS = 3; // Maximum number of rows for the textarea
const USER_TYPING_TIMEOUT = 1000; // Timeout for user typing detection (in milliseconds)

export default function useChatInput(
  selectedUser,
  setChatUserList,
  isEdit,
  messageId,
  initialContent,
  closeEditDialog
) {
  const [rows, setRows] = useState(1);
  const [messageContent, setMessageContent] = useState(initialContent || "");
  const textareaRef = useRef(null);
  const { send, handleUserTyping } = useWebSocket();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const { showError } = useNotification();
  const {
    emojiPickerRef,
    showEmojiPicker,
    handleClickOnEmojiPicker,
    handleOnEmojiClick,
  } = useEmojiPicker();
  const user = JSON.parse(localStorage.getItem("user"));
  const senderId = user.id; // Assuming you have the sender's ID from local storage
  const handleSend = async () => {
    if (isEdit) {
      handleEditMessage();
      return;
    }
    if (!messageContent.trim()) return;

    const message_id = Date.now(); // Generate a unique message ID based on timestamp
    // Create the message object
    const chatMessage = {
      type: "chat_message",
      chat_uuid: selectedUser.chat_uuid,
      recipient_id: selectedUser.user.id,
      content: messageContent.trim(),
      timestamp: new Date().toISOString(),
      message_id: message_id,
    };

    // Send via WebSocket
    send(chatMessage);
    //send notification to the user
    sendMessageNotification(selectedUser.user.id, selectedUser.user.first_name);
    //also add the message to the chat user list
    sendMessageLocalUpdatesAndCleanup(message_id, senderId, chatMessage);
  };

  const handleEditMessage = async () => {
    if (initialContent.trim() === messageContent.trim()) {
      closeEditDialog(); // Close edit dialog if content is unchanged
      return;
    }
    try {
      setChatUserList(
        produce((draft) => {
          const chat = draft.find(
            (chat) => chat.user.id === selectedUser.user.id
          );
          if (chat) {
            const message = chat.messages.find((msg) => msg.id === messageId);
            if (message) {
              message.content = messageContent.trim();
              message.is_deleted = "no"; // Reset deletion status on edit
            }
          }
        })
      );
      closeEditDialog(); // Close the edit dialog after sending
      await apiPost(`/chats/chat/message/${messageId}/`, {
        content: messageContent.trim(),
      });
    } catch (error) {
      console.error("Error editing message:", error);
      showError("Failed", "Failed to edit message", "edit_message_error");
    }
  };

  const sendMessageLocalUpdatesAndCleanup = (
    message_id,
    senderId,
    chatMessage
  ) => {
    setChatUserList(
      produce((draft) => {
        const chat = draft.find((ch) => ch.user.id === selectedUser.user.id);
        if (chat) {
          chat.messages.push({
            id: message_id,
            sender_id: senderId,
            content: chatMessage.content,
            timestamp: chatMessage.timestamp,
            read: false,
            is_deleted: "no", // Default to "no" for new messages
          });
        }
      })
    );

    setMessageContent("");
    handleInput(); // Reset textarea height after sending
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // or your initial height
      setRows(DEFAULT_ROWS);
    }
  };

  const sendMessageNotification = async (user_id, first_name) => {
    try {
      await apiPost(`/notifications/send/`, {
        user_id: user_id,
        title: "New message",
        body: "You have a new message from " + first_name,
      });
    } catch (error) {
      console.error("Error sending notification:", error);
      showError(
        "Failed",
        "Failed to send notification",
        "send_notification_error"
      );
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    //to get the scroll height of the textarea
    textarea.style.height = "auto";

    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
    const scrollHeight = textarea.scrollHeight;
    const newRows = Math.min(3, Math.floor(scrollHeight / lineHeight));
    setRows(newRows);

    if (newRows === MAX_ROWS) {
      textarea.style.height = `${lineHeight * MAX_ROWS}px`;
    } else {
      textarea.style.height = `${scrollHeight}px`;
    }
  };

  const handleTypingActivity = () => {
    // If user wasn't previously typing, notify that they started
    if (!isTyping) {
      setIsTyping(true);
      handleUserTyping(selectedUser.chat_uuid, selectedUser.user.id, true);
    }

    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set a new timeout to detect when typing stops
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      handleUserTyping(selectedUser.chat_uuid, selectedUser.user.id, false);
    }, USER_TYPING_TIMEOUT); // Adjust this delay as needed (1000ms = 1 second)
  };

  const handleChange = (e) => {
    if (e.target.value.length > MAX_MESSAGE_LENGTH) {
      showError(`Message content exceeds ${MAX_MESSAGE_LENGTH} characters`);
      return;
    }
    setMessageContent(e.target.value);
    handleTypingActivity(); // Track typing activity

    // Call handleInput to adjust height whenever content changes
    handleInput();

    // If message is empty, reset to single row
    if (!e.target.value.trim()) {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto"; // or your initial height
        setRows(DEFAULT_ROWS);
      }
    }
  };

  const handleOnBlur = () => {
    if (isTyping) {
      clearTimeout(typingTimeoutRef.current);
      setIsTyping(false);
      handleUserTyping(selectedUser.chat_uuid, selectedUser.user.id, false);
    }
  };

  return {
    messageContent,
    setMessageContent,
    handleSend,
    handleOnEmojiClick,
    handleClickOnEmojiPicker,
    showEmojiPicker,
    textareaRef,
    handleInput,
    rows,
    emojiPickerRef,
    handleChange,
    isTyping,
    setIsTyping,
    typingTimeoutRef,
    handleTypingActivity,
    handleUserTyping,
    handleOnBlur,
  };
}
