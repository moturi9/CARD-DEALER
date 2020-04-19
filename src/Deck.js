import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card'

import './Deck.css'

const api_base_url = 'https://deckofcardsapi.com/api/deck/'

class Deck extends Component {
  constructor(props) {
    super(props)
    this.state = { deck: null, drawn: [] }
    this.getCard = this.getCard.bind(this)
  }

  async getCard() {
    const deck_id = this.state.deck.deck_id
    // https://deckofcardsapi.com/api/deck/<<deck_id>>/draw

    try {
      const api_url = `${api_base_url}${deck_id}/draw`
      let cardResponse = await axios.get(api_url)
      if (!cardResponse.data.success) {
        throw new Error('no reamaining cards')
      } else {
        let card = cardResponse.data.cards[0]
        this.setState(st => ({
          drawn: [
            ...st.drawn,
            {
              id: card.code,
              image: card.image,
              name: `${card.value} ${card.suit}`
            }
          ]
        }))
      }
    } catch (err) {
      alert(err)
    }
  }

  async componentDidMount() {
    let deck = await axios.get(`${api_base_url}new/shuffle/`)
    this.setState({ deck: deck.data })
  }

  render() {
    let cards = this.state.drawn.map(c => (
      <Card name={c.name} image={c.image} />
    ))

    return (
      <div className="Deck-text">
        <h1> Card Dealer </h1>
        <button onClick={this.getCard}>Get Card</button>
        <div className="Deck-textarea">{cards}</div>
      </div>
    )
  }
}

/* export the component to be used in other components */
export default Deck
