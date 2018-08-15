import React from "react";
import Message from "./Message";
import ConversationReply from "../../../../../containers/Message/ConversationReply";
import "./Conversation.css";

const Conversation = ({ conversation, user, markAsRead, loggedInUser }) => {
  const { _id, firstName, lastName, userPhotoURL } = user;
  const { messages, conversationId, subject, updatedAt } = conversation;
  //   const { userPhotoURL } = loggedInUser;
  console.log("messages", messages);
  //   console.log("loggedInUser", loggedInUser);
  const messagesList = messages.map(message => {
    return (
      <Message
        key={message.dateSent}
        user={user}
        message={message}
        firstName={firstName}
        markAsRead={markAsRead}
      />
    );
  });
  return (
    <div className="box">
      {/* Message Header Container */}
      <article key={conversationId} className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img
              src={userPhotoURL || "https://bulma.io/images/placeholders/128x128.png"}
              alt={"Person"}
            />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{`${firstName} ${lastName}`}</strong>{" "}
              <span className="is-pulled-right">{getDate(updatedAt)}</span>
            </p>
            <p>
              Subject: <em>{subject}</em>
            </p>
          </div>
          {messagesList}
        </div>
      </article>

      {/* Messages */}

      {/* {messagesList} */}

      {/* Reply Area */}
      <article className="media">
        {/* <figure className="media-left">
          <p className="image is-64x64">
            <img src={"https://bulma.io/images/placeholders/128x128.png"} alt={"Placeholder"} />
          </p>
		</figure> */}
        <div className="media-left">
          <p>Reply</p>
        </div>
        <div className="media-content">
          <ConversationReply receivingUser={_id} conversationId={conversationId} />
        </div>
      </article>
    </div>
  );
};

export default Conversation;

function getDate(date) {
  date = new Date(date);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
