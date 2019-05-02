import React from 'react'
import CryptoPage from './CryptoPage'
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
      console.log(data);
      this.setState({
        coins: data.data.coins
      })
    })
  }

  render() {
    return (
      <div className="page-container">
        <NavBar handleClick={this.handleClick}/>
        <CryptoPage coins={this.state.coins}/>
      </div>
    )
  }

}

export default AppContainer
