import React from 'react'
import Browse from './Browse'
import NavBar from '../components/NavBar'

class AppContainer extends React.Component {

  state = {
    coins: []
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
        <NavBar />
        <Browse coins={this.state.coins} handleBrowseScrollClick={this.handleBrowseScrollClick}/>
      </div>
    )
  }

}

export default AppContainer
