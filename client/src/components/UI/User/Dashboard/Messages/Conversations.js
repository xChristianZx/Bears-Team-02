import React, { Component } from "react";
import "./Conversations.css";
import { connect } from "react-redux";
import Conversation from "./Conversation";
// import MessageItem from "./MessageItem";
import MessageList from "./MessageList";

class Conversations extends Component {
  state = {
    conversationFocusData: null
  };

  setConvoFocus = convoID => {
    // console.log("convoID", convoID);
    this.setState({ conversationFocusData: convoID });
  };

  render() {
    // Need to flatten and sort on the backend
    console.log("PROPS", this.props);
    const { Message, loggedInUser, markAsRead } = this.props;
    const { conversations } = Message;
    // console.log("Conversations", conversations);
    const flattendConversations = conversations.started.concat(conversations.received);
    // console.log("FLAT", flattendConversations);
    const listConversations = flattendConversations
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .map((conversation, i) => {
        //   const { _id, subject, messages, receivingUser } = conversation;
        const { _id } = conversation;
        if (_id === undefined || _id === null) {
          return <p>No Messages</p>;
        }

        return (
          <Conversation
            key={_id}
            conversation={conversation}
            iterator={i}
            loggedInUser={loggedInUser}
            markAsRead={markAsRead}
            setConvoFocus={this.setConvoFocus}
            // 	 user={receivingUser}
            //   conversationId={_id}
            //   subject={subject}
            //   messages={messages}
          />
        );
      });

    return (
      <div className="columns">
        <div className="column is-half mobile-12">
          <nav className="panel">
            <div className="panel-heading">
              <p className="subtitle is-5 is-marginless">Conversations</p>
              <button className="button is-text" onClick={() => alert("Create New Messages - coming soon!")}>
                <span className="icon" title="New Message">
                  <i className="far fa-envelope" />
                </span>
              </button>
            </div>
            {listConversations}
          </nav>
        </div>
        <div className="column is-half mobile-12">
          <MessageList
            conversation={this.state.conversationFocusData}
            loggedInUser={loggedInUser}
            markAsRead={this.props.markAsRead}
            user={this.props.user}
          />
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
