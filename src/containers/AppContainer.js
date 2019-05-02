import React from 'react'
import CryptoPage from './CryptoPage'
import NavBar from '../components/NavBar'

class AppContainer extends React.Component {

  state = {
    coins: []
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
        <NavBar />
        <CryptoPage coins={this.state.coins}/>
      </div>
    )
  }

}

export default AppContainer
