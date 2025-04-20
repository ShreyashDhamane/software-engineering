import UserImage from "@/components/atom/UserImage/UserImage";
import { getUserFullName } from "@/utils/string";

const ChatHeader = ({ selectedUser, onlineUsers, listOfUsersTyping }) => {
  const user = selectedUser.user;
  const isUserOnline = onlineUsers.some(
    (onlineUser) => onlineUser.id === user.id
  );
  const isTyping = listOfUsersTyping.includes(user.id.toString());
  return (
    <div
      key={user.id}
      className="flex gap-3 px-4 py-3 items-center chatBackgroundDark"
    >
      <UserImage imageUrl={user.avatar} width={40} height={40} />
      <div className="flex flex-col justify-center">
        <h3 className="text-md font-semibold text-forum-heading truncate leading-none">
          {getUserFullName(user.first_name, user.last_name)}
        </h3>
        <p className="text-forum-subheading2 truncate text-sm">
          {isUserOnline ? (
            isTyping ? (
              <span className="text-forum-heading">typing...</span>
            ) : (
              "Online"
            )
          ) : (
            "Offline"
          )}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
