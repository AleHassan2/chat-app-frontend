import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5001";

export const useSocketStore = create()(
  devtools(
    (set, get) => ({
      // State
      socket: null,
      isConnected: false,
      onlineUsers: new Map(),
      onlineFriends: [],
      activeCall: null,
      incomingCall: null,
      notifications: [],
      typingUsers: new Map(),

      // Actions
      initializeSocket: (token, retryCount = 0) => {
        const maxRetries = 3;
        const { socket: existingSocket } = get();

        // Disconnect existing socket if any
        if (existingSocket) {
          existingSocket.disconnect();
        }

        // Create new socket connection
        const newSocket = io(SOCKET_URL, {
          auth: { token },
          transports: ["websocket", "polling"],
        });

        // Connection events
        newSocket.on("connect", () => {
          console.log("Socket connected:", newSocket.id);
          set({ isConnected: true });
          toast.success("Connected to server");
        });

        newSocket.on("disconnect", (reason) => {
          console.log("Socket disconnected:", reason);
          set({ isConnected: false });
          if (reason !== "io client disconnect") {
            toast.error("Connection lost");
          }
        });

        newSocket.on("connect_error", (error) => {
          console.error("Socket connection error:", error);
          set({ isConnected: false });
          if (retryCount < maxRetries) {
            setTimeout(() => {
              get().initializeSocket(token, retryCount + 1);
            }, 2000 * (retryCount + 1)); // Exponential backoff
          } else {
            toast.error("Failed to connect to server");
          }
        });

        // User presence events
        newSocket.on("online_friends", ({ friends }) => {
          console.log("Online friends received:", friends);
          set({ onlineFriends: friends });
        });

        newSocket.on("friend_status_update", (statusUpdate) => {
          console.log("Friend status update:", statusUpdate);
          const { onlineFriends } = get();
          const updatedFriends = onlineFriends.map((friend) =>
            friend.userId === statusUpdate.userId
              ? { ...friend, ...statusUpdate }
              : friend
          );

          if (
            !onlineFriends.find((f) => f.userId === statusUpdate.userId) &&
            statusUpdate.status === "online"
          ) {
            updatedFriends.push(statusUpdate);
          }

          set({
            onlineFriends: updatedFriends.filter((f) => f.status === "online"),
          });
        });

        // Video call events
        newSocket.on("incoming_call", (callData) => {
          console.log("Incoming call:", callData);
          set({ incomingCall: callData });

          // Show call notification with string instead of JSX
          toast(
            `Incoming ${callData.callType} call from ${callData.caller.fullName}`,
            {
              duration: 30000,
              icon: "📞",
            }
          );
        });

        newSocket.on("call_accepted", (callData) => {
          console.log("Call accepted:", callData);
          set({ activeCall: callData, incomingCall: null });
          toast.success("Call connected");
        });

        newSocket.on("call_rejected", () => {
          console.log("Call rejected");
          set({ incomingCall: null, activeCall: null });
          toast.error("Call was rejected");
        });

        newSocket.on("call_ended", () => {
          console.log("Call ended");
          set({ activeCall: null, incomingCall: null });
          toast.success("Call ended");
        });

        newSocket.on("call_failed", ({ error }) => {
          console.log("Call failed:", error);
          set({ activeCall: null, incomingCall: null });
          toast.error(`Call failed: ${error}`);
        });

        newSocket.on("call_timeout", () => {
          console.log("Call timed out");
          set({ incomingCall: null, activeCall: null });
          toast.error("Call timed out");
        });

        newSocket.on("call_missed", () => {
          console.log("Call missed");
          set({ incomingCall: null });
          toast.error("Missed call");
        });

        // WebRTC signaling events
        newSocket.on("webrtc_offer", (data) => {
          console.log("WebRTC offer received:", data);
          // This will be handled by the call component
        });

        newSocket.on("webrtc_answer", (data) => {
          console.log("WebRTC answer received:", data);
          // This will be handled by the call component
        });

        newSocket.on("webrtc_ice_candidate", (data) => {
          console.log("ICE candidate received:", data);
          // This will be handled by the call component
        });

        // Notification events
        newSocket.on("new_friend_request", (notification) => {
          console.log("New friend request:", notification);
          const { notifications } = get();
          set({
            notifications: [notification, ...notifications],
          });

          toast(`New friend request from ${notification.sender.fullName}`, {
            duration: 5000,
            icon: "👥",
          });
        });

        newSocket.on("friend_request_accepted_notification", (notification) => {
          console.log("Friend request accepted:", notification);
          toast.success(
            `${notification.accepter.fullName} accepted your friend request`
          );
        });

        newSocket.on("new_message_notification", (notification) => {
          console.log("New message notification:", notification);
          // Handle message notifications here if needed
        });

        // Typing events
        newSocket.on("user_typing", ({ senderId, senderName, isTyping }) => {
          const { typingUsers } = get();
          const updatedTyping = new Map(typingUsers);

          if (isTyping) {
            updatedTyping.set(senderId, {
              name: senderName,
              timestamp: Date.now(),
            });
          } else {
            updatedTyping.delete(senderId);
          }

          set({ typingUsers: updatedTyping });

          // Clear typing indicator after 3 seconds of inactivity
          setTimeout(() => {
            const currentTyping = get().typingUsers;
            const userTyping = currentTyping.get(senderId);
            if (userTyping && Date.now() - userTyping.timestamp > 2500) {
              const newTyping = new Map(currentTyping);
              newTyping.delete(senderId);
              set({ typingUsers: newTyping });
            }
          }, 3000);
        });

        set({ socket: newSocket });
      },

      // Disconnect socket
      disconnect: () => {
        const { socket } = get();
        if (socket) {
          socket.disconnect();
        }
        set({
          socket: null,
          isConnected: false,
          onlineUsers: new Map(),
          onlineFriends: [],
          activeCall: null,
          incomingCall: null,
          typingUsers: new Map(),
        });
      },

      // Call actions
      initiateCall: (recipientId, callType = "video") => {
        const { socket } = get();
        if (socket && socket.connected) {
          socket.emit("initiate_call", { recipientId, callType });
        }
      },

      acceptCall: (callId, roomId) => {
        const { socket } = get();
        if (socket && socket.connected) {
          socket.emit("accept_call", { callId, roomId });
        }
      },

      rejectCall: (callId, roomId) => {
        const { socket } = get();
        if (socket && socket.connected) {
          socket.emit("reject_call", { callId, roomId });
          set({ incomingCall: null });
        }
      },

      endCall: (callId, roomId) => {
        const { socket } = get();
        if (socket && socket.connected) {
          socket.emit("end_call", { callId, roomId });
          set({ activeCall: null });
        }
      },

      // WebRTC signaling
      sendWebRTCOffer: (roomId, offer, targetId = null) => {
        const { socket } = get();
        if (socket && socket.connected) {
          socket.emit("webrtc_offer", { roomId, offer, targetId });
        }
      },

      sendWebRTCAnswer: (roomId, answer, targetId = null) => {
        const { socket } = get();
        if (socket && socket.connected) {
          socket.emit("webrtc_answer", { roomId, answer, targetId });
        }
      },

      sendICECandidate: (roomId, candidate, targetId = null) => {
        const { socket } = get();
        if (socket && socket.connected) {
          socket.emit("webrtc_ice_candidate", { roomId, candidate, targetId });
        }
      },

      // Typing indicators
      sendTyping: (recipientId, isTyping) => {
        const { socket } = get();
        if (socket && socket.connected) {
          socket.emit("user_typing", { recipientId, isTyping });
        }
      },

      // Media controls during call
      toggleMedia: (roomId, mediaType, enabled) => {
        const { socket } = get();
        if (socket && socket.connected) {
          socket.emit("toggle_media", { roomId, mediaType, enabled });
        }
      },

      // Screen sharing
      startScreenShare: (roomId) => {
        const { socket } = get();
        if (socket && socket.connected) {
          socket.emit("start_screen_share", { roomId });
        }
      },

      stopScreenShare: (roomId) => {
        const { socket } = get();
        if (socket && socket.connected) {
          socket.emit("stop_screen_share", { roomId });
        }
      },

      // Utility functions
      clearIncomingCall: () => set({ incomingCall: null }),
      clearActiveCall: () => set({ activeCall: null }),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: "socket-store",
    }
  )
);
