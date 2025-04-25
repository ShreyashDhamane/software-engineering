"use client";
import { apiPost } from "@/utils/fetch/fetch";
import { useRef, useState } from "react";

export default function useChatMessage(
  message,
  openSettingsId,
  setOpenSettingsId,
  setChatUserList,
  selectedUser,
  messagesContainerRef
) {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [settingsDivDirection, setSettingsDivDirection] =
    useState("left-bottom");
  const [isDisabled, setIsDisabled] = useState(false); // State to track if the button is disabled
  const settingsRef = useRef(null);
  const isSettingsOpen = openSettingsId === message.id;

  const handleClickOutside = (e) => {
    if (isSettingsOpen) {
      setOpenSettingsId(null);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
    } catch (error) {
      showError("Failed", "Failed to copy message", "copy_message_error");
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleteDialogOpen(true);
    } catch (error) {
      showError("Failed", "Failed to delete message", "delete_message_error");
    } finally {
      // setIsDeleteDialogOpen(false);
    }
  };

  const handleEdit = async () => {
    try {
      setIsEditDialogOpen(true);
    } catch (error) {
      console.log("Error editing message:", error);

      showError("Failed", "Failed to edit message", "edit_message_error");
    } finally {
      // setIsEditDialogOpen(false);
    }
  };

  const handleMessageSettingsPanelPosition = () => {
    const container = messagesContainerRef.current.getBoundingClientRect();
    const settings = settingsRef.current.getBoundingClientRect();

    //set the direction of the settings div based on the position of the message and the container
    //  setSettingsDivDirection,
    let direction = "left-bottom"; // Default direction
    if (settings.bottom > container.bottom) {
      if (settings.left < container.left) {
        direction = "right-top";
      } else {
        direction = "left-top"; // Left top
      }
    } else {
      if (settings.left < container.left) {
        direction = "right-bottom"; // Right bottom
      } else {
        direction = "left-bottom"; // Left bottom
      }
    }
    console.log("settingsDivDirection", direction);

    setSettingsDivDirection(direction);
  };

  const handleSettingsClick = () => {
    // console.log("message settings clicked: ", message);
    setSettingsDivDirection("left-bottom"); // Reset to default direction
    setOpenSettingsId(isSettingsOpen ? null : message.id);
  };

  const deleteMessage = async (type) => {
    try {
      setIsDisabled(true); // Disable the button to prevent multiple clicks
      await apiPost(`/chats/chat/${message.id}/delete/`, {
        delete_type: type,
      });
      setChatUserList((prevList) => {
        return prevList.map((user) => {
          if (user.user.id === selectedUser.user.id) {
            return {
              ...user,
              messages: user.messages.map((msg) => {
                if (msg.id === message.id) {
                  return { ...msg, is_deleted: type };
                }
                return msg;
              }),
            };
          }
          return user;
        });
      });
    } catch {
      console.error("Error deleting message:", error);
      showError("Failed", "Failed to delete message", "delete_message_error");
    } finally {
      setIsDeleteDialogOpen(false);
      setIsDisabled(false); // Re-enable the button after the operation
    }
  };

  return {
    currentUserId,
    isSettingsOpen,
    handleSettingsClick,
    settingsRef,
    handleCopy,
    handleDelete,
    handleEdit,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    deleteMessage,
    settingsDivDirection,
    setSettingsDivDirection,
    isEditDialogOpen,
    setIsEditDialogOpen,
    handleMessageSettingsPanelPosition,
    setCurrentUserId,
    handleClickOutside,
    isDisabled,
  };
}
