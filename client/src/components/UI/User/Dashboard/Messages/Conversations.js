import React from "react";
import Conversation from "./Conversation";
// import "./Conversations.css";

const Conversations = ({ conversations, connections, loggedInUser, markAsRead }) => {
  console.log("Conversations", conversations);
  const listConversationsStarted = conversations.started
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .map(conversation => {
      //   const { _id, subject, messages, receivingUser } = conversation;
      const { _id, receivingUser } = conversation;
      if (_id === undefined || _id === null) {
        return <p>No Messages</p>;
      }

      return (
        <Conversation
          key={_id}
          conversation={conversation}
          user={receivingUser}
          markAsRead={markAsRead}
          loggedInUser={loggedInUser}
          //   conversationId={_id}
          //   subject={subject}
          //   messages={messages}
        />
      );
    });

  const listConversationsReceived = conversations.received
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .map(conversation => {
      //   const { _id, subject, messages, sendingUser } = conversation;
      const { _id, sendingUser } = conversation;
      if (_id === undefined || _id === null) {
        return <p>No Messages</p>;
      }
      return (
        <Conversation
          key={_id}
          conversation={conversation}
          user={sendingUser}
          markAsRead={markAsRead}
          // conversationId={_id}
          // subject={subject}
          // messages={messages}
        />
      );
    });

  // let filteredConnections = connections.filter(connection => connection.username === 'sackfield');

  return (
    <div className="columns is-mobile is-centered ">
      <div className="column is-half">
        <div className="has-text-centered">
          <h2 className="title is-5">Conversations Started:</h2>
        </div>
        {listConversationsStarted}
      </div>
      <div className="column is-half">
        <div className="has-text-centered">
          <h2 className="title is-5">Conversations Received:</h2>
        </div>
        {listConversationsReceived}
      </div>
    </div>
  );
};
export default Conversations;
