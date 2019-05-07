import React from 'react'
import { Form, Button } from 'react-bootstrap'
class Login extends React.Component {
  state={
    username: "",
    password: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = () => {
    console.log("loggin in", this.state)
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input onChange={this.handleChange} name="username" value={this.state.username} placeholder="Username" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input onChange={this.handleChange} type="password" name="username" value={this.state.password} placeholder="Password" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}
