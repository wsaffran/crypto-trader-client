import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

class CryptoPage extends React.Component {

  numberWithCommas = (x) => {
    const floatNum = parseFloat(x).toFixed(2)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  renderCoin = (coin) => {
    return (
        <ListGroup.Item id={coin.id} action variant={coin.classActive ? "success" : null} onClick={() => this.props.handleBrowseScrollClick(coin)}> <img src={coin.iconUrl} style={{width: 25, height: 25}}/> {coin.name} - ({coin.symbol}) </ListGroup.Item>
    )
  }

  render() {
    return this.renderCoin(this.props.coin)
  }
}

export default CryptoPage
