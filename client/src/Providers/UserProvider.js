import React, { createContext, Component } from 'react'

export const UserContext = createContext()

class UserProvider extends Component {
  state = {
    userName: '',
    password: ''
  }

  render() {
    return(
      <UserContext.Provider value={{
        state: this.state,
        handleChange: (event) => {
          if(event.target.name === 'userName') {
            this.setState({ userName: event.target.value })
          } else {
              this.setState({ password: event.target.value})
          }
        },
        handleSubmit: (e) => {
          e.preventDefault()
          console.log(this.state)
        }
      }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserProvider