import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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


  render() {
    return (
      <div>
        <h1>{this.props.coin.name}</h1>
        <Line
          data={this.returnData()}
          width={100}
          height={50}
          options={{ maintainAspectRatio: true }}
        />
        <div class="row justify-content-center">
          Stats
        </div>
        <Row>
          <Col xs={4}>
            {this.props.coin.price}
          </Col>
          <Col xs={4}>
            {this.props.coin.price}
          </Col>
          <Col xs={4}>
            {this.props.coin.price}
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            {this.props.coin.price}
          </Col>
          <Col xs={4}>
            {this.props.coin.price}
          </Col>
          <Col xs={4}>
            {this.props.coin.price}
          </Col>
        </Row>
      </div>
    )
  }
}

export default CoinStatGraph
