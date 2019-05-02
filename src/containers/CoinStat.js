import React from 'react'

class CoinStat extends React.Component {

  render() {
    return <h1>{this.props.coin.name}</h1>
  }
}

export default CoinStat
