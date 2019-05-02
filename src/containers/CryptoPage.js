import React from 'react'
import CoinObject from '../components/CoinObject'

class CryptoPage extends React.Component {

  renderCoins = () => {
    return this.props.coins.map(coin => {
      return <CoinObject coin={coin.coin} />
    })
  }

  render() {
    return (
      <div>
        <h1>Cyrpto Page</h1>
        <p>
          {this.renderCoins()}
        </p>
      </div>
    )
  }

}

export default CryptoPage;
