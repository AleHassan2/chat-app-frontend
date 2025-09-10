// src/components/common/SocketInitializer.jsx
import { useEffect } from "react";
import { StreamChat } from "stream-chat";
import { useSocketStore } from "../store/socketStore";
import { useAuthContext } from "../hooks/use-auth-context";

// Create Stream Chat client
const streamApiKey = import.meta.env.VITE_STREAM_API_KEY;
const streamClient = StreamChat.getInstance(streamApiKey);

const SocketInitializer = () => {
  const { initializeSocket, disconnect } = useSocketStore();
  const { user, authenticated } = useAuthContext();

  useEffect(() => {
    if (authenticated && user?.accessToken) {
      console.log("Initializing socket connection for user:", user._id);
      initializeSocket(user.accessToken);

      // Connect to Stream Chat
      if (user.streamToken) {
        streamClient.connectUser(
          {
            id: user._id,
            name: user.fullName,
            image:
              user.profilePic ||
              `https://avatar.iran.liara.run/public/${user.username}.png`,
          },
          user.streamToken
        );
      }
    } else {
      console.log("Disconnecting socket - user not authenticated");
      disconnect();

      // Disconnect from Stream Chat
      if (streamClient.userID) {
        streamClient.disconnectUser();
      }
    }

    // Cleanup on unmount
    return () => {
      disconnect();
      if (streamClient.userID) {
        streamClient.disconnectUser();
      }
    };
  }, [authenticated, user, initializeSocket, disconnect]);

  return null; // This component doesn't render anything
};

export default SocketInitializer;
