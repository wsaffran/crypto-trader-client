import React from 'react'
import CoinObject from '../components/CoinObject'
import CoinStatGraph from './CoinStatGraph'
import v4 from 'uuid'

class Browse extends React.Component {

  renderCoins = () => {
    return this.props.coins.map(coin => {
      return <CoinObject key={v4()} coin={coin} handleBrowseScrollClick={this.props.handleBrowseScrollClick}/>
    })
  }

  renderCoinInfo = () => {
    return this.props.coins.map(coin => {
      if (coin.classActive === true) {
        return <CoinStatGraph key={v4()} coin={coin} />
      }
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8">
            {this.renderCoinInfo()}
          </div>
          <div className="col-sm-4 scrollable">
            <div className="listGroup">
              {this.renderCoins()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Browse
