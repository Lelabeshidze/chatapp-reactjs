import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Messages from "./Messages";
import axios from "axios";
import { getAllMsgRoute, sendMsgRoute } from "../Utils/APIRoutes";
function ChatContainer({ currentChat, currentUser }) {
  const [messages, setMessages] = useState([]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMsgRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
  };
  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.post(getAllMsgRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
      
    };
    getMessages();
  }, [currentChat]);
  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => {
              return (
                <div key={index}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "received"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
`;
export default ChatContainer;
