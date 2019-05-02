import React from 'react'
import CoinObject from '../components/CoinObject'
import CoinStat from './CoinStat'
import v4 from 'uuid'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Browse extends React.Component {

  renderCoins = () => {
    return this.props.coins.map(coin => {
      return <CoinObject key={v4()} coin={coin} handleBrowseScrollClick={this.props.handleBrowseScrollClick}/>
    })
  }

  renderCoinInfo = () => {
    return this.props.coins.map(coin => {
      if (coin.classActive === true) {
        return <CoinStat key={v4()} coin={coin} />
      }
    })
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={8}>
            {this.renderCoinInfo()}
          </Col>
          <Col className="scrollable">
            <listGroup>
              {this.renderCoins()}
            </listGroup>
          </Col>
        </Row>
      </div>



      // <listGroup>
      //   {this.renderCoins()}
      // </listGroup>
    )
  }
}

export default Browse
