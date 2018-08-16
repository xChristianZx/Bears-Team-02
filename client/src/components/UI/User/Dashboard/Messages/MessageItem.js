import React from "react";

const MessageItem = ({ user, message, markAsRead }) => {
  const { _id, sendingUser, messageBody, read } = message;
  return (
    <article key={_id} className="media">
      <figure className="media-left">
        <p className="image is-32x32">
          <img
            className="is-rounded"
            src={sendingUser.userPhotoURL || "https://bulma.io/images/placeholders/128x128.png"}
            alt={sendingUser.firstName}
          />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p className="Sender">
            <strong>{sendingUser.firstName}</strong> <em>@{sendingUser.username}</em>
          </p>
          <p className="subtitle is-6">{messageBody}</p>
        </div>
      </div>
      <div className="media-right">
        <p className="Status">{read ? "Read" : "Unread"}</p>

        {sendingUser.username !== user.username ? (
          <button hidden={read} onClick={() => markAsRead(_id)}>
            Mark as Read
          </button>
        ) : null}
      </div>
    </article>
  );
};

export default MessageItem;
