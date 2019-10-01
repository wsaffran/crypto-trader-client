import React from 'react'

class Transaction extends React.Component {

  state = {
    num_of_coins: 0,
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
      num_of_coins: parseInt(event.target.value)
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.user_data.balance > (this.props.coinInfo.price * this.state.num_of_coins)) {
      fetch('http://localhost:3001/users/1/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': "application/json"
        },
        body: JSON.stringify({
          user_id: 1,
          coin_id: parseFloat(this.props.coinInfo.id),
          num_of_coins: parseInt(this.state.num_of_coins),
          price: parseFloat(this.props.coinInfo.price),
          time_of_purchase: (new Date().toLocaleString())
        })
      })
      .then(res => res.json())
      fetch('http://localhost:3001/users/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': "application/json",
        },
        body: JSON.stringify(
          {balance: parseFloat(this.state.user_data.balance) - (parseInt(this.state.num_of_coins) * parseFloat(this.props.coinInfo.price))}
        )
      })
      .then(res => {
        this.props.handlePortfolioSubmit()
      })


    }
  }

  render() {
    return (
      <div>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <label>
            Buy:
            <input type="number" value={this.state.num_of_coins} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Transaction
