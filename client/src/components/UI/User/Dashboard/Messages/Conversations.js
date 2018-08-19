import React, { Component } from "react";
import "./Conversations.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getConversationFocusData } from "../../../../../actions/MessagingActions";
import Conversation from "./Conversation";
import MessageList from "./MessageList";

class Conversations extends Component {
  render() {
    // TODO - Need to flatten and sort on the backend
    // console.log("PROPS", this.props);
    const { Message, loggedInUser, markAsRead } = this.props;
    const { conversations } = Message;
    // console.log("Conversations", conversations);
    const flattendConversations = conversations.started.concat(conversations.received);
    const listConversations = flattendConversations
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .map((conversation, i) => {
        const { _id } = conversation;
        if (_id === undefined || _id === null) {
          return <p>No Messages</p>;
        }

        return (
          <Conversation
            key={_id}
            conversation={conversation}
            iterator={i} // Only for testing purposes
            loggedInUser={loggedInUser}
            markAsRead={markAsRead}
            setConvoFocus={this.props.getConversationFocusData}
          />
        );
      });

    return (
      <div className="columns">
        <div className="column is-half mobile-12">
          <nav className="panel">
            <div className="panel-heading">
              <p className="subtitle is-5 is-marginless">Conversations</p>
              <button
                className="button is-text"
                onClick={() =>
                  alert(
                    `Create New Messages - coming soon! \rUse the Connections tab to send a direct message`
                  )
                }
              >
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
            conversationFocusData={this.props.conversationFocusData}
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
    conversationFocusData: Message.conversationFocusData,
    user: User.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getConversationFocusData }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conversations);
