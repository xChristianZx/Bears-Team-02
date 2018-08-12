import React from 'react'
import Message from './Message';

const Conversation = ({ _id, subject, messages, user, markAsRead }) => {
  let { firstName, lastName } = user
  let messagesList = messages.map(message => {
    return <Message message={message} markAsRead={markAsRead || null} />
  })
  return (
    <div key={_id}>
      <p>Name: {firstName} {lastName}</p>
      <p>Subject: {subject}</p>
      {messagesList}
    </div>
  )
}

export default Conversation