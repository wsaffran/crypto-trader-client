import React from 'react'
import Browse from './Browse'
import NavBar from '../components/NavBar'
import LearnMore from '../components/LearnMore'

class AppContainer extends React.Component {

  state = {
    coins: [],
    selection: "browse"
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
      console.log("user")
    }
    this.setState({
      selection: newSelection
    })
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

  renderSelection() {
    console.log("function called!")
    if (this.state.selection === "learn-more") {
      return <LearnMore />
    } else if (this.state.selection === "browse") {
      return <Browse coins={this.state.coins} handleBrowseScrollClick={this.handleBrowseScrollClick}/>
    }
  }

  render() {
    console.log("render function called!")
    return (
      <div className="page-container">
        <NavBar handleClick={this.handleClick}/>
        {this.renderSelection()}
      </div>
    )
  }

}

export default AppContainer
