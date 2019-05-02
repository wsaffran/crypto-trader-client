import React from 'react'
import Browse from './Browse'
import NavBar from '../components/NavBar'

class AppContainer extends React.Component {

  state = {
    coins: []
  }

  handleClick = (e) => {
    if (e.target.name === "portfolio") {
      console.log("portfolio")
    } else if (e.target.name === "learn-more") {
      console.log("learn more")
    } else if (e.target.name === "browse") {
      console.log("browse")
    } else {
      console.log("user")
    }
  }

  componentDidMount() {
    fetch('https://api.coinranking.com/v1/public/coins')
    .then(res => res.json())
    .then(data => {
      // const state = data.data.coins
      // const newState = state.map(item => {item, classActive: false})
      this.setState({
        // data.data.coins
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

  render() {
    return (
      <div className="page-container">
<<<<<<< HEAD
        <NavBar />
        <Browse coins={this.state.coins} handleBrowseScrollClick={this.handleBrowseScrollClick}/>
=======
        <NavBar handleClick={this.handleClick}/>
        <CryptoPage coins={this.state.coins}/>
>>>>>>> fc7ebb1d4c703e1e5c4ab8e1128941130f71c471
      </div>
    )
  }

}

export default AppContainer
