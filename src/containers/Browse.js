import React from 'react'
import CoinObject from '../components/CoinObject'
import CoinStatGraph from './CoinStatGraph'
import v4 from 'uuid'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Form, Button } from 'react-bootstrap'


class Browse extends React.Component {

  state={
    value: ''
  }

  handleFormSubmit = (event, user_id, coin_id, num_of_coins, price, time_of_purchase) => {
    this.setState({
      value: event.target.value
    })
    this.addToPortfolio(user_id, coin_id, num_of_coins, price, time_of_purchase)
  }

  renderCoins = () => {
    return this.props.coins.map(coin => {
      return <CoinObject key={v4()} coin={coin} handleBrowseScrollClick={this.props.handleBrowseScrollClick}/>
    })
  }

  renderCoinInfo = () => {
    return this.props.coins.map(coin => {
      if (coin.classActive === true) {
        // console.log(this.props.currentUser, coin.id, coin.price, (new Date().toLocaleString()))
        return (
          <div>
          <CoinStatGraph key={v4()} coin={coin} />
            <Form onSubmit={event => this.handleSubmit(event, this.props.currentUser, coin.id, event.target.value, coin.price, (new Date().toLocaleString()))}>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Purchase</Form.Label>
                <Form.Control type="text" value={this.state.value} placeholder="# of units" />
              </Form.Group>
              <Button className="btn btn-primary btn-large centerButton" type="submit">Confirm Purchase</Button>
            </Form>
          </div>
        )
      }
    })
  }


  render() {
    return (
      <div>
        <Row>
          ...
        </Row>
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
    )
  }
}

export default Browse;
