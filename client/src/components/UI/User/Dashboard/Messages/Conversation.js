import React from 'react'
import Message from './Message';
import ConversationReply from '../../../../../containers/Message/ConversationReply';

const Conversation = ({ _id, subject, messages, user, markAsRead }) => {
  let { firstName, lastName } = user
  let messagesList = messages.map(message => {
    return <Message message={message} firstName={firstName} markAsRead={markAsRead || null} />
  })
  return (
    <div key={_id}>
    {console.log('ID', _id)}
      <p>Name: {firstName} {lastName}</p>
      <p>Subject: {subject}</p>
      {messagesList}
      {_id === undefined ? <ConversationReply receivingUser={user._id} conversationId={_id} /> : <p>Loading...</p> }
      
      <button>
        Reply
      </button>
    </div>
  )
}

export default Conversation