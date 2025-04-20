import ChatHeader from "@/components/molecules/Chat/ChatHeader/ChatHeader";
import ChatMessage from "@/components/molecules/Chat/ChatMessage/ChatMessage";
import ChatInput from "@/components/molecules/Chat/ChatInput/ChatInput";
import { ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import topography from "@/public/images/topography.svg";
const ChatUser = ({
  selectedUser,
  setChatUserList,
  messagesEndRef,
  onlineUsers,
  chatUserList,
  setIsSidebarOpen,
  handleUserTyping,
  listOfUsersTyping,
}) => {
  const [openSettingsId, setOpenSettingsId] = useState(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.style.overflow = openSettingsId
        ? "hidden"
        : "auto";
    }
  }, [openSettingsId]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header with Back Button */}
      <div className="flex items-center bg-bg-post chatBackgroundDark">
        <button
          className="md:hidden p-1 m-1 rounded flex items-center justify-center text-forum-subheading hover:text-forum-heading transition-colors"
          onClick={() => setIsSidebarOpen(true)}
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1">
          <ChatHeader
            selectedUser={chatUserList.find(
              (user) => user.user.id === selectedUser.user.id
            )}
            onlineUsers={onlineUsers}
            listOfUsersTyping={listOfUsersTyping}
          />
        </div>
      </div>

      {/* Messages Container - Use flex-1 to take available space */}
      <div
        className="flex-1 overflow-y-auto scrollbar-hide"
        style={{
          // backgroundImage: 'url("/images/topography.svg")',
          backgroundImage: `url(${topography.src})`,
          backgroundSize: "cover",
        }}
        ref={messagesContainerRef}
      >
        {chatUserList
          .find((user) => user.user.id === selectedUser.user.id)
          .messages.map((message) => {
            {
              /* console.log("Rendering message:", message); */
            }
            if (message.is_deleted == "everyone") {
              return null; // Skip rendering deleted messages for everyone
            }
            if (
              message.is_deleted == "self" &&
              message.sender_id !== selectedUser.user.id
            ) {
              return null; // Skip rendering messages deleted by others
            }
            return (
              <ChatMessage
                key={message.id}
                message={message}
                openSettingsId={openSettingsId}
                setOpenSettingsId={setOpenSettingsId}
                setChatUserList={setChatUserList}
                selectedUser={selectedUser}
                messagesContainerRef={messagesContainerRef}
              />
            );
          })}
        {listOfUsersTyping.includes(selectedUser.user.id.toString()) && (
          <div className="ml-4">
            <img
              src="/icons/typing-animation.gif"
              alt="typing animation"
              width={60}
              height={60}
              className="unoptimized"
            />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Container - Fixed at bottom with proper spacing for navbar */}
      <div className="mt-auto px-2 mb-4">
        <ChatInput
          selectedUser={selectedUser}
          setChatUserList={setChatUserList}
          handleUserTyping={handleUserTyping}
        />
      </div>
    </div>
  );
};

export default ChatUser;
