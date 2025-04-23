'use client";';
import { useWebSocket } from "@/contexts/WebSocketContext";
import { apiPost } from "@/utils/fetch/fetch";
import { produce } from "immer";
export default function useChatSidebar({
  setSelectedUser,
  setChatUserList,
  setIsSidebarOpen,
}) {
  const { handleUserSelection } = useWebSocket();

  const handleUserSelect = async (chat) => {
    try {
      setSelectedUser(chat);
      //if unread count is greater than 0, set all messages to read
      if (chat.unread_count == 0) return;
      //set all messages to read in backend for given user, chat
      await apiPost(`/chats/${chat.chat_uuid}/read/${chat.user.id}/`);

      //update the chat user list to set unread count to 0 for the selected user
      setChatUserList(
        produce((draft) => {
          const chatUser = draft.find(
            (chatUser) => chatUser.user.id === chat.user.id
          );
          if (chatUser) {
            chatUser.unread_count = 0;
            chatUser.messages.forEach((message) => {
              message.read = true;
            });
          }
          return draft;
        })
      );

      handleUserSelection(chat.chat_uuid, chat.user.id);
    } catch (error) {
      console.error("Error selecting user:", error);
    }
  };

  const handleSidebarUserClick = (chatUser) => {
    handleUserSelect(chatUser);
    setIsSidebarOpen(false);
  };

  return { handleSidebarUserClick };
}
