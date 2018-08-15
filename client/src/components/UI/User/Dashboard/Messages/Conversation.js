import React from "react";
import Message from "./Message";
import ConversationReply from "../../../../../containers/Message/ConversationReply";
import classNames from "classnames";
import "./Conversation.css";

const Conversation = ({
  conversation,
  user,
  markAsRead,
  loggedInUser,
  iterator,
  setConvoFocus
}) => {
  const { _id, firstName, lastName, userPhotoURL } = user;
  const { messages, subject, updatedAt } = conversation;
  //   const { userPhotoURL } = loggedInUser;
  //   console.log("cnv", conversation._id);
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
  const isActive = classNames({
    "is-active": iterator === 0 ? true : false
  });
  return (
    <a className={`panel-block ${isActive}`} onClick={() => setConvoFocus(conversation)}>
      <article key={conversation._id} className="media media-panel-container">
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
              <span className="has-text-left">
                <strong>{`${firstName} ${lastName}`}</strong>
              </span>
            </p>
            <p>
              <em>{subject}</em>
            </p>
          </div>
          {/* {messagesList} */}
        </div>
        <div className="media-right">
          <span className="has-text-right">{getDate(updatedAt)}</span>
        </div>
      </article>
    </a>
  );
};

export default Conversation;

function getDate(date) {
  date = new Date(date);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/* Messages */

/* {messagesList} */

/* Reply Area */

/* <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src={"https://bulma.io/images/placeholders/128x128.png"} alt={"Placeholder"} />
          </p>
		</figure>
        <div className="media-left">
          <p>Reply</p>
        </div>
        <div className="media-content">
          <ConversationReply receivingUser={_id} conversationId={conversation._id} />
        </div>
      </article> */
