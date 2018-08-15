import React from "react";
// import './Message.css';

// const Message = ({ message, user, markAsRead }) => {
const Message = ({ user, message, markAsRead }) => {
  const { _id, sendingUser, messageBody, read } = message;
  //   console.log("USERNAME", user.username, sendingUser.username);
  //   const floatClass = user.username === sendingUser.username ? "media-left" : "media-right";
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
            {" "}
            {/* ({sendingUser.username === user.username ? sendingUser.firstName : "You"}) */}
            <strong>{sendingUser.firstName}</strong> <em>@{sendingUser.username}</em>
          </p>
          <p className="subtitle is-6">{messageBody}</p>

          {sendingUser.username === user.username ? (
            <button hidden={read} onClick={() => markAsRead(_id)}>
              Mark as Read
            </button>
          ) : null}
        </div>
      </div>
      <div className="media-right">
        <p className="Status">Status: {read ? "Read" : "Unread"} </p>
      </div>
    </article>
  );
};

export default Message;
