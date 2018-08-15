import React, { Component } from "react";
import "./Conversations.css";
import Conversation from "./Conversation";
import Message from "./Message";
import { connect } from "react-redux";

class Conversations extends Component {
  state = {
    conversationFocusData: null
  };

  //   componentDidMount() {}

  setConvoFocus = convoID => {
    console.log("convoID", convoID);
    this.setState({ conversationFocusData: convoID });
  };

  renderMessages = () => {
    const { messages } = this.state.conversationFocusData;
    const messageList = messages.map(message => {
      return (
        <Message
          key={message.dateSent}
          user={this.props.user}
          message={message}
          markAsRead={this.props.markAsRead}
        />
      );
    });
    return messageList;
  };

  render() {
    console.log("PROPS", this.props);
    const { conversations, connections, loggedInUser, markAsRead } = this.props;
    console.log("Conversations", conversations);
    const flattendConversations = conversations.started.concat(conversations.received);
    // console.log("FLAT", flattendConversations);
    const listConversations = flattendConversations
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .map((conversation, i) => {
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
            setConvoFocus={this.setConvoFocus}
            iterator={i}
            //   conversationId={_id}
            //   subject={subject}
            //   messages={messages}
          />
        );
      });

    return (
      <div className="columns is-mobile">
        <div className="column is-half">
          <nav className="panel">
            <div className="panel-heading">
              <p className="subtitle is-5 is-marginless">Conversations</p>
              <span className="icon" title="New Message">
                <i className="far fa-envelope" />
              </span>
            </div>
            {listConversations}
          </nav>
        </div>
        <div className="column is-half">
          <h2>Messages here</h2>
          {this.props.Message.conversations === null || this.state.conversationFocusData === null
            ? null
            : this.renderMessages()}
        </div>
      </div>
    );
  }
}
function mapStateToProps({ Message, User }) {
  return {
    Message,
    user: User.user
  };
}
export default connect(mapStateToProps)(Conversations);

/* <div className="columns is-mobile is-centered ">
<div className="column is-half">
  <div className="header-wrapper has-text-centered">
	<h2 className="title is-5">Conversations Started:</h2>
  </div>
  {listConversationsStarted}
</div>
<div className="column is-half">
  <div className="header-wrapper has-text-centered">
	<h2 className="title is-5">Conversations Received:</h2>
  </div>
  {listConversationsReceived}
</div>
</div> */

/* const listConversationsReceived = conversations.received
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
    }); */
