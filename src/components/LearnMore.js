import React from 'react'
import Card from 'react-bootstrap/Card'


const LearnMore = (props) => {
  return (
    <div class='container'>
    <Card>
      <Card.Header as="h5">What is CryptoTrader?</Card.Header>
      <Card.Body>
        <Card.Title>the fantasy football of cryptocurrency mining and trading.</Card.Title>
        <Card.Text>
          Using live data, CryptoTrader allows you to simulate blockchain transactions in real-time, building your virtual portfolio and tracking the value of your assets. You're also able to view historical data of any cryptocurrency, helping you perfect your investment skills and think smarter about your transactions.
        </Card.Text>
      </Card.Body>
    </Card>
    <Card>
      <Card.Header as="h5">What is Cryptocurrency?</Card.Header>
      <Card.Body>
        <Card.Title>digital assets of the future.</Card.Title>
        <Card.Text>
        A cryptocurrency is a digital asset designed to work as a medium of exchange that uses strong cryptography to secure financial transactions, control the creation of additional units, and verify the transfer of assets. Cryptocurrencies use decentralized control as opposed to centralized digital currency and central banking systems.The decentralized control of each cryptocurrency works through distributed ledger technology, typically a blockchain, that serves as a public financial transaction database. Bitcoin, first released as open-source software in 2009, is generally considered the first decentralized cryptocurrency. Since the release of bitcoin, over 4,000 altcoins (alternative variants of bitcoin, or other cryptocurrencies) have been created.
        </Card.Text>
      </Card.Body>
    </Card>
    <Card>
      <Card.Header as="h5">How do I get started?</Card.Header>
      <Card.Body>
        <Card.Title>simulating your crypto transactions is a click away.</Card.Title>
        <Card.Text>
        Begin by clicking the "browse" button above. From there, you'll be able to view the latest values of any cryptocurrency we offer here, and purchase an amount, adding it to your portfolio. Monitor your portfolio and be ready to sell if you're skeptical of your assets!
        </Card.Text>
      </Card.Body>
    </Card>
      <Card>
       <Card.Header as="h5">How do I translate this to success with real-world crypto transactions?</Card.Header>
       <Card.Body>
         <Card.Title>make your mark.</Card.Title>
         <Card.Text>
         In order to simulate as realistic an experience as possible, try to transfer only as much funds as you would be able to with an actual trading account. To transfer funds, click the “User” tab in the top right corner and add funds in USD.
         </Card.Text>
       </Card.Body>
       </Card>
    </div>
  )
}

export default LearnMore;
