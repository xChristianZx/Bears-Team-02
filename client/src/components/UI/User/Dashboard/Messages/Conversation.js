import React from "react";
import classNames from "classnames";
import "./Conversation.css";

const Conversation = ({ conversation, iterator, loggedInUser, markAsRead, setConvoFocus }) => {
  const { subject, updatedAt } = conversation;
  // console.log("CONVERSATION", iterator, conversation);

  /* otherUser - filter's the loggedInUser to display other person involved in conversation */
  const otherUser = conversation.receivingUser._id
    ? conversation.receivingUser
    : conversation.sendingUser;
  const { firstName, lastName, userPhotoURL } = otherUser;

  // TODO - FIX
  const isActive = classNames({
    "is-active": iterator === 0 ? true : false
  });
  return (
    <a className={`panel-block ${isActive}`} onClick={() => setConvoFocus(conversation._id)}>
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
              <span className="has-text-left is-capitalized">
                <strong>{`${firstName} ${lastName}`}</strong>
              </span>
            </p>
            <p>
              <em>{subject}</em>
            </p>
          </div>
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
