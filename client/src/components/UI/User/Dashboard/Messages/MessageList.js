import React, { Component } from "react";
import MessageItem from "./MessageItem";
import ConversationReply from "../../../../../containers/Message/ConversationReply";

class MessageList extends Component {
  renderMessages = () => {
    if (this.props.conversationFocusData === null) {
      return;
    }
    console.log("Render messages", this.props);
    const { messages } = this.props.conversationFocusData;

    const messageList = messages.map(message => {
      return (
        <MessageItem
          key={message._id}
          message={message}
          markAsRead={this.props.markAsRead}
          user={this.props.user}
        />
      );
    });
    return messageList;
  };

  render() {
    const { conversationFocusData } = this.props;
    function recUserId() {
      if (conversationFocusData) {
        const receivingUserID = conversationFocusData.receivingUser._id
          ? conversationFocusData.receivingUser._id
          : conversationFocusData.sendingUser._id;
        return receivingUserID;
      }
    }
    return (
      <React.Fragment>
        {conversationFocusData === null ? null : (
          <div className="box">
            {this.renderMessages()}
            <hr />
            <article className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img
                    className="is-rounded"
                    src={
                      this.props.user.userPhotoURL ||
                      "https://bulma.io/images/placeholders/128x128.png"
                    }
                    alt={"Placeholder"}
                  />
                </p>
              </figure>
              <div className="media-content">
                <ConversationReply
                  receivingUser={recUserId()}
                  conversationId={conversationFocusData._id}
                  conversation={conversationFocusData}
                  style={{ width: "100%" }}
                />
              </div>
            </article>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default MessageList;
