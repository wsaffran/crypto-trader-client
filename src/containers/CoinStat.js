import React from 'react'
import {Line} from 'react-chartjs-2';


class CoinStat extends React.Component {

  state = {
    data: []
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
    console.log(this.state.data);
    return (
      {
        labels: ['Monday', '.', '.', '.', '.', '.', 'Tuesday', '.', '.', '.', '.', '.', 'Wednesday', '.', '.', '.', '.', '.', 'Thursday', '.', '.', '.', '.', '.', 'Friday', '.', '.', '.', '.', '.', 'Saturday', '.', '.', '.', '.', '.', 'Sunday'],
        datasets: [
          {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
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


  render() {
    console.log("in render", this.state.data);
    return (
      <div>
        <h1>{this.props.coin.name}</h1>
        <Line
          data={this.returnData()}
          width={100}
          height={50}
          options={{ maintainAspectRatio: true }}
        />
      </div>
    )
  }
}

export default CoinStat
