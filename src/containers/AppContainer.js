import React from 'react'
import Browse from './Browse'
import NavBar from '../components/NavBar'
import LearnMore from '../components/LearnMore'
import Portfolio from '../components/Portfolio'

const CryptoAPI = 'https://api.coinranking.com/v1/public/coins'


class AppContainer extends React.Component {

  state = {
    coins: [],
    selection: "browse",
    currentUser: 1
  }

  handleClick = (e) => {
    let newSelection;
    if (e.target.name === "portfolio") {
      newSelection = "portfolio"
    } else if (e.target.name === "learn-more") {
      newSelection = "learn-more"
    } else if (e.target.name === "browse") {
      newSelection = "browse"
    } else if (e.target.name === "user") {
      newSelection = "user"
    }
    this.setState({
      selection: newSelection
    })
  }

  // addToPortfolio(user_id, coin_id, num_of_coins, price, time_of_purchase) {
  //   fetch(`localhost:3001/users/${user_id}/purchases`, {method: "POST",
  //     headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify({
  //       user_id: user_id,
  //       coin_id: coin_id,
  //       num_of_coins: num_of_coins,
  //       price: price,
  //       time_of_purchase: time_of_purchase})
  //     })
  //     .then(res => res.json())
  //     .then(json )
  //
  // }

  componentDidMount() {
    fetch(CryptoAPI)
    .then(res => res.json())
    .then(data => {
      this.setState({
        coins: data.data.coins.map(coin => {
          return {...coin, classActive: false}
        })
      })
    })
  }

  handleBrowseScrollClick = (coin) => {
    const oldState = this.state.coins.map(coin => {
      return {...coin, classActive: false}
    })

    const newState = oldState.map(data => {
      if (data.name === coin.name) {
        return {...coin, classActive: true}
      } else {
        return data
      }
    })
    this.setState({
      coins: newState
    })
  }

  renderSelection() {
    if (this.state.selection === "learn-more") {
      return <LearnMore />
    } else if (this.state.selection === "browse") {
      return <Browse coins={this.state.coins} currentUser={this.state.currentUser} handleBrowseScrollClick={this.handleBrowseScrollClick}/>
    }
  }

  render() {
    return (
      <div className="page-container">
        <NavBar handleClick={this.handleClick}/>
        {this.renderSelection()}
      </div>
    )
  }

}

export default AppContainer
