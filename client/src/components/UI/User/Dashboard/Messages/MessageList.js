import React, { Component } from "react";
import MessageItem from "./MessageItem";
import ConversationReply from "../../../../../containers/Message/ConversationReply";

class MessageList extends Component {
  renderMessages = () => {
    const { messages } = this.props.conversation;
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
    // console.log("MESSAGELIST PROPS", this.props);
    const { conversation } = this.props;
    // console.log("Conversation", conversation);
    function recUserId() {
      if (conversation) {
        const receivingUserID = conversation.receivingUser._id
          ? conversation.receivingUser._id
          : conversation.sendingUser._id;
        return receivingUserID;
      }
    }
    return (
      <React.Fragment>
        {conversation === null ? null : (
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
                  //   receivingUser={receivingUserID}
                  receivingUser={recUserId()}
                  conversationId={conversation._id}
                  conversation={conversation}
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
