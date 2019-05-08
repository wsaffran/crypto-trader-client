import React from 'react'
import Table from 'react-bootstrap/Table'
import {Pie} from 'react-chartjs-2'
import v4 from 'uuid'
import PortfolioTransaction from '../components/PortfolioTransaction'

const options = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    position: 'right',
    labels: {
      boxWidth: 10
    }
  }
}

class Portfolio extends React.Component {

  state = {
    user_id: 1,
    cash: 0,
    transactions: [],
    user_data: [],
    chartData: [],
  }

  componentDidMount() {
    fetch('http://localhost:3001/users/1/purchases')
    .then(res => res.json())
    .then(data => {
      this.setState({
        transactions: data
      })
    })
    fetch('http://localhost:3001/users/1')
    .then(res => res.json())
    .then(data => {
      this.setState({
        user_data: data
      })
    })
  }

  getCoinName = (id) => {
    let newCoin
    this.props.coins.forEach(coin => {
      if (coin.id === id) {
        newCoin = coin.name
      }
    })
    return newCoin

  }

  getTransactions = () => {
    const transactions = this.state.transactions.map(transaction => {
      return this.getCoinName(transaction.coin_id)
    })
    var unique = Array.from(new Set(transactions))
    return unique
  }


  renderCurrentPortfolioBalance = () => {
    let cash = 0, numCoins = 0, pricePerCoin = 0, currentPricePerCoin = 0, total = 0
    if (this.state.transactions !== []) {
      cash = this.state.user_data.balance
      this.state.transactions.map(transaction => {
        numCoins = transaction.num_of_coins
        pricePerCoin = transaction.price
        let currentCoin = this.props.coins.forEach(coin => {
          if (coin.id === transaction.coin_id) {
            currentPricePerCoin = coin.price
          }
        })
        total += ( (numCoins * currentPricePerCoin))
      })
    }
    return total + cash
  }

  getCoinAmount = (coin) => {
    let foundCoin

    this.props.coins.forEach(coins => {
      if (coins.name === coin) {
        foundCoin = coins.id
      }
    })

    let total = 0

    this.state.transactions.forEach(transaction => {
      if (transaction.coin_id === foundCoin) {
        total += transaction.num_of_coins
      }
    })
    return total
  }

  getCurrentPrice = (coin) => {
    let foundCoin

    this.props.coins.forEach(coins => {
      if (coins.name === coin) {
        foundCoin = coins.price
      }
    })

    return foundCoin
  }

  getCoinToken = (coin) => {
    let foundCoin

    this.props.coins.forEach(coins => {
      if (coins.name === coin) {
        foundCoin = coins.iconUrl
      }
    })

    return foundCoin
  }

  renderRows = () => {
    return this.getTransactions().map(coin => {
      return (
        <tr>
          <td><img src={this.getCoinToken(coin)} style={{height: 25, width: 25}}/></td>
          <td>{coin}</td>
          <td>{this.getCoinAmount(coin)}</td>
          <td>${this.numberWithCommas(this.getCurrentPrice(coin))}</td>
          <td>${this.numberWithCommas((this.getTotalCost(coin)))}</td>
          <td>${this.numberWithCommas((this.getCurrentValue(coin)))}</td>
          <td>{this.getPercentGain(coin).toFixed(2)}%</td>
        </tr>
      )
    })
  }

  getPercentGain = (coin) => {
    let coinCost = this.getTotalCost(coin)
    let coinValue = this.getCurrentValue(coin)

    const percentChange = ((coinValue - coinCost) / coinCost) * 100

    return percentChange
  }

  getCurrentValue = (coin) => {
    let coinValue = 0
    let foundCoin
    let currentPrice = 0

    if (coin) {
      this.props.coins.forEach(coins => {
        if (coins.name === coin) {
          foundCoin = coins
        }
      })

      currentPrice = foundCoin.price

      this.state.transactions.forEach(transaction => {
        if (transaction.coin_id === foundCoin.id) {
          coinValue = coinValue + (transaction.num_of_coins*currentPrice)
        }
      })
    }

    return coinValue
  }

  getTotalCost = (coin) => {
    let coinCost = 0
    let foundCoin

    if (coin) {
      this.props.coins.forEach(coins => {
        if (coins.name === coin) {
          foundCoin = coins
        }
      })

      this.state.transactions.forEach(transaction => {
        if (transaction.coin_id === foundCoin.id) {
          coinCost = coinCost + (transaction.num_of_coins*transaction.price)
        }
      })
    }
    return coinCost
  }

  getChartData = () => {

    let chartData = []
    let chartBackgroundColor = []


    this.getTransactions().forEach(coin => {
      chartData.push(this.getCurrentValue(coin))
    })

    this.getTransactions().forEach(coin1 => {
      this.props.coins.forEach(coin2 => {
        if (coin1 === coin2.name) {
          chartBackgroundColor.push(coin2.color)
        }
      })
    })

    chartData.unshift(this.state.user_data.balance)
    chartBackgroundColor.unshift('green')

    const data = {
      labels: ['Cash', ...this.getTransactions()],
      datasets: [{
        data: chartData,
        backgroundColor: chartBackgroundColor,
        hoverBackgroundColor: chartBackgroundColor
      }]
    }

    return data
  }

  getTotalCostBeforeGain = () => {
    let total = 0
    this.state.transactions.forEach(coin => {
      total += coin.price * coin.num_of_coins
      // ${this.numberWithCommas(this.getTotalCost(coin))}</td>
      // <td>${this.numberWithCommas(this.getCurrentValue(coin))}</td>
      // <td>{this.getPercentGain(coin).toFixed(2)}%</td>
    })
    return (parseFloat(total) + parseFloat(this.state.user_data.balance))
  }

  numberWithCommas = (x) => {
    const floatNum = parseFloat(x).toFixed(2)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  handleTransactClick = (coin) => {
    if (coin === 'cash') {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Number of Coins:
            <input type="number" value={this.state.num_of_coins} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      )
    }
  }


  render() {
    return (
      <div className="portfolio">
        <h1>{this.state.user_data.first_name + ' ' + this.state.user_data.last_name + "'s Portfolio"}</h1>
        <br></br>
        <div className="row">

          <div className="col-sm-3" style={{'textAlign': 'right'}}>

            <h1>Portfolio Value</h1>
            <h1>Cash Value</h1>
            <h1>Capital Gain</h1>
            <h1>Percent Gain</h1>
            <h3>Transactions</h3>
            <h3>Coins Owned</h3>
          </div>

          <div className="col-sm-3" style={{'text-align': 'left'}}>
            <h1>${this.numberWithCommas(this.renderCurrentPortfolioBalance())}</h1>
            <h1>${this.numberWithCommas(this.state.user_data.balance)}</h1>
            <h1>${this.numberWithCommas(this.renderCurrentPortfolioBalance() - this.getTotalCostBeforeGain())}</h1>
            <h1>{this.numberWithCommas((this.renderCurrentPortfolioBalance() - this.getTotalCostBeforeGain()) / this.getTotalCostBeforeGain() * 100)}%</h1>
            <h3>{this.state.transactions.length}</h3>
            <h4>{this.getTransactions().join(", ")}</h4>
          </div>

          <div className="col-sm-6">
            <Pie data={this.getChartData()} height={450} width={600} options={options}/>
          </div>
        </div>
        <br></br>
        <Table bordered responsive="sm">
          <thead>
            <tr>
              <td colSpan="7">Portfolio</td>
            </tr>
            <tr>
              <td>Icon</td>
              <td>Coin</td>
              <td>Amount</td>
              <td>Current Price</td>
              <td>Total Cost</td>
              <td>Total Current Value</td>
              <td>% Gain</td>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
            <tr>
              <td><i class="fas fa-dollar-sign"></i></td>
              <td>Cash</td>
              <td>{this.numberWithCommas((this.state.user_data.balance))}</td>
              <td>$1.00</td>
              <td>${this.numberWithCommas((this.state.user_data.balance))}</td>
              <td>${this.numberWithCommas((this.state.user_data.balance))}</td>
              <td>0.00%</td>
            </tr>
          </tbody>
        </Table>
      <PortfolioTransaction key={v4()} coins={this.props.coins} getTransactions={this.getTransactions} transactions={this.state.transactions} getCoinName={this.getCoinName} userData={this.state.user_data}/>
      </div>
      )
    }
  }

export default Portfolio
