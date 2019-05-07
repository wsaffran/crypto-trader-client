import React from 'react'
import {Line} from 'react-chartjs-2';

var date7 = new Date();
date7.setDate(date7.getDate()-6);

var date6 = new Date();
date6.setDate(date6.getDate()-5);

var date5 = new Date();
date5.setDate(date5.getDate()-4);

var date4 = new Date();
date4.setDate(date4.getDate()-3);

var date3 = new Date();
date3.setDate(date3.getDate()-2);

var date2 = new Date();
date2.setDate(date2.getDate()-1);

var date1 = new Date();
date1.setDate(date1.getDate());


class CoinStatGraph extends React.Component {

  state = {
    data: [],
    days: [`${date7.getMonth()}/${date7.getDate()}`, '', '', '', '', '', `${date6.getMonth()}/${date6.getDate()}`, '', '', '', '', '', `${date5.getMonth()}/${date5.getDate()}`, '', '', '', '', '', `${date4.getMonth()}/${date4.getDate()}`, '', '', '', '', '', `${date3.getMonth()}/${date3.getDate()}`, '', '', '', '', '', `${date2.getMonth()}/${date2.getDate()}`, '', '', '', '', '', `${date1.getMonth()}/${date1.getDate()}`]
  }

  componentDidMount() {
    fetch(`https://api.coinranking.com/v1/public/coin/${this.props.coin.id}/history/7d`)
    .then(res => res.json())
    .then(history => {
      const newState = history.data.history.map(info => {
        return info.price
      })
      this.setState({
        data: newState
      })
    })
  }

  returnData = () => {
    const data = this.state.data
    const days = this.state.days
    const color = this.props.coin.color

    return (
      {
        labels: days,
        datasets: [
          {
            label: `${this.props.coin.name}`,
            fill: true,
            lineTension: 0.1,
            backgroundColor: color,
            borderColor: color,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'black',
            pointBackgroundColor: 'white',
            pointBorderWidth: .5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data
          }
        ]
      }
    )
  }

  numberWithCommas = (x, decimal) => {
    const floatNum = parseFloat(x).toFixed(decimal)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  render() {
    return (
      <div>
        <div className="row justify-content-center graph">
          <h1>{this.props.coin.name}</h1>
          <Line
            data={this.returnData()}
            width={70}
            height={35}
            options={{ maintainAspectRatio: true }}
          />
        </div>
        <div className="row justify-content-center">
          {this.props.coin.description}
        </div>
        <div className="row coin-stat-graph">
          <div className="col-sm-4"> Price:
            {" $" + this.numberWithCommas(this.props.coin.price, 2)}
          </div>
          <div className="col-sm-4"> Market Cap:
            {" $" + this.numberWithCommas(this.props.coin.marketCap, 0)}
          </div>
          <div className="col-sm-4"> All time high:
            {" $" + this.numberWithCommas(this.props.coin.allTimeHigh.price, 2)}
          </div>
        </div>
        <div className="row coin-stat-graph">
          <div className="col-sm-4"> Total Supply:
            {" " + this.numberWithCommas(this.props.coin.totalSupply, 0)}
          </div>
          <div className="col-sm-4"> Volume:
            {" " + this.numberWithCommas(this.props.coin.volume)}
          </div>
          <div className="col-sm-4"> Change:
            {" " + this.props.coin.change + "%"}
          </div>
        </div>
        <div className="row coin-stat-graph buttons">
          <div className="col-sm-8">
          </div>
          <div className="col-sm-4">
            <button type="button" className="btn btn-primary coin-stat-graph" onClick={null}>Transact</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CoinStatGraph
