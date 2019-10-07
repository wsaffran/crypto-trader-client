import React from 'react'

class PortfolioTransaction extends React.Component {

  state = {
    coin: '',
    amount: 0,
    transaction: 'buy',
    totalCost: 0
  }

  renderCoinSelections = () => {
    return this.props.getTransactions().map(transaction => {
      return <option value={transaction}>{transaction}</option>
    })
  }

  handleChangeCoin = (event) => {
    this.setState({
      coin: event.target.value
    })
  }

  handleChangeAmount = (event) => {
    this.setState({
      amount: event.target.value
    })
  }

  handleChangeTransaction = (event) => {
    this.setState({
      transaction: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let coins = 0
    const coin = this.props.coins.find(coin => coin.name === this.state.coin)
    if (this.state.transaction === 'buy') {
      if (parseFloat(this.props.userData.balance) >= parseFloat(this.state.amount)*parseFloat(coin.price)) {
        fetch('http://localhost:3001/users/1/purchases', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accepts': "application/json"
          },
          body: JSON.stringify({
            user_id: 1,
            coin_id: coin.id,
            num_of_coins: this.state.amount,
            price: parseFloat(coin.price),
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
            {balance: parseFloat(this.props.userData.balance) - (parseFloat(this.state.amount) * parseFloat(coin.price))}
          )
        })
        .then(res => res.json())
      }
    } else if (this.state.transaction === 'sell') {
      this.props.transactions.forEach(transaction => {
        if (transaction.coin_id === coin.id) {
          coins += transaction.num_of_coins
        }
      })
      if (this.state.amount <= coins) {
        fetch('http://localhost:3001/users/1/purchases', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accepts': "application/json"
          },
          body: JSON.stringify({
            user_id: 1,
            coin_id: coin.id,
            num_of_coins: -(this.state.amount),
            price: parseFloat(coin.price),
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
            {balance: parseFloat(this.props.userData.balance) + (parseFloat(this.state.amount) * parseFloat(coin.price))}
          )
        })
        .then(res => {
        this.props.handlePortfolioSubmit()})
      }
    }
  }


  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Coin:
            <select value={this.state.coin} onChange={this.handleChangeCoin}>
              <option value=''>Please Select</option>
              {this.renderCoinSelections()}
            </select>
          </label>
          <label>
            How Many:
            <input type="number" value={this.state.amount} onChange={this.handleChangeAmount} />
          </label>

          <select value={this.state.transaction} onChange={this.handleChangeTransaction}>
            <option value='buy'>Buy</option>
            <option value='sell'>Sell</option>
          </select>

          <input type="submit" value="Submit" />
        </form>
    )
  }
}

export default PortfolioTransaction;
