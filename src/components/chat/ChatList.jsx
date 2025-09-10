import React, { useMemo } from "react";
import Avatar from "../common/Avatar";

const mockChats = [
  {
    id: 1,
    name: "Alice",
    lastMessage: "Hey, how are you?",
    time: "10:30 AM",
    unread: 2,
    profilePic: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Bob",
    lastMessage: "Let’s meet tomorrow!",
    time: "Yesterday",
    unread: 0,
    profilePic: "https://i.pravatar.cc/150?img=2",
  },
];

const ChatList = React.memo(({ searchQuery }) => {
  const filtered = useMemo(
    () =>
      mockChats.filter((chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  return (
    <div className="h-full overflow-y-auto">
      {filtered.length > 0 ? (
        filtered.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center gap-3 p-3 hover:bg-wa-light-100 dark:hover:bg-wa-dark-tertiary cursor-pointer border-b border-wa-light-200 dark:border-wa-dark-tertiary"
          >
            <Avatar src={chat.profilePic} alt={chat.name} size="md" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-wa-light-900 dark:text-wa-light-50 truncate">
                  {chat.name}
                </h4>
                <span className="text-xs text-wa-light-500 dark:text-wa-light-400">
                  {chat.time}
                </span>
              </div>
              <p className="text-sm text-wa-light-600 dark:text-wa-light-400 truncate">
                {chat.lastMessage}
              </p>
            </div>
            {chat.unread > 0 && (
              <span className="bg-wa-green-500 text-white text-xs rounded-full px-2 py-1">
                {chat.unread}
              </span>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-wa-light-500 dark:text-wa-light-400 py-6">
          No chats found
        </p>
      )}
    </div>
  );
});

export default ChatList;
