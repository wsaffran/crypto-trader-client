import React from 'react'

class Transaction extends React.Component {

  state = {
    num_of_coins: ''
  }

  handleChange = (event) => {
    this.setState({
      num_of_coins: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3001/users/1/purchases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: 1,
        coin_id: this.props.coinInfo.id,
        num_of_coins: this.state.num_of_coins,
        price: this.props.coinInfo.price,
        time_of_purchase: (new Date().toLocaleString())
      })
    })
    .then(res => res.json())
    .then(console.log)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Number of Coins:
          <input type="number" value={this.state.num_of_coins} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Transaction
