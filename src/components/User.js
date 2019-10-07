import React from 'react'

class User extends React.Component {

  state = {
    amount: 0,
    user_data: []
  }

  componentDidMount() {
    fetch('http://localhost:3001/users/1')
    .then(res => res.json())
    .then(data => {
      this.setState({
        user_data: data
      })
    })
  }

  handleChange = (event) => {
    this.setState({
      amount: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3001/users/1', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json",
      },
      body: JSON.stringify(
        {balance: parseFloat(this.state.user_data.balance) + parseFloat(this.state.amount)}
      )
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        amount: 0
      }, this.props.handlePortfolioSubmit())
    })
  }

  numberWithCommas = (x) => {
    const floatNum = parseFloat(x).toFixed(2)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  displayForm = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Amount to Deposit:
          <input type="number" value={this.state.amount} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }

  render() {
    return (
      <div style={{padding:50}}>
        <h1>{this.state.user_data.first_name + " " + this.state.user_data.last_name}</h1>
        <h4>Current Balance: ${this.numberWithCommas(parseFloat(this.state.user_data.balance))}</h4>
        {this.displayForm()}
      </div>
    )
  }
}

export default User
