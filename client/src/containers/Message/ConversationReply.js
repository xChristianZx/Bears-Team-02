import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as messageActions from "../../actions/MessagingActions";

import FormBuilder from "../../components/UI/Form/FormBuilder";
import { withAlert } from "react-alert";

const Fields = [
  {
    label: "Reply",
    name: "messageBody",
    type: "textarea",
    className: "textarea",
    component: "textarea",
    errorMsg: "Message is required"
  }
];

class ConversationReply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receivingUser: ""
    };
  }

  onSubmit = values => {
    let receivingUserId = this.props.receivingUser;
    let ConversationId = this.props.conversationId;
    let data = { ...values, receivingUserId, ConversationId };
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
        <FormBuilder fields={Fields} onSubmit={this.onSubmit} buttonText="Reply" />
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
