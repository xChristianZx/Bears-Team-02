import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as messageActions from "../../actions/MessagingActions";

import FormBuilder from "../../components/UI/Form/FormBuilder";
import { withAlert } from "react-alert";

const Fields = [
  {
    name: "messageBody",
    type: "textarea",
    component: "textarea",
    errorMsg: "Message is required"
  }
];

class ConversationReply extends Component {
  onSubmit = values => {
    let receivingUserId = this.props.receivingUser;
    let ConversationId = this.props.conversationId;
    let data = { ...values, receivingUserId, ConversationId };
    // console.log("ON SUBMIT", data);
    this.props.actions.reply(data);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.flashMessage !== this.props.flashMessage) {
      this.props.alert.show(this.props.flashMessage);
    }
  }

  render() {
    return (
      <Fragment>
        <FormBuilder
          buttonText="Reply"
          fields={Fields}
          onSubmit={this.onSubmit}
          resetOnSubmit={true}
          style={this.props.style}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ UI }) => {
  return { flashMessage: UI.flashMessage };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Object.assign(messageActions), dispatch)
  };
};

ConversationReply = withAlert(ConversationReply);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationReply);
