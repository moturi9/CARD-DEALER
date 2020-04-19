import React, { Component } from 'react'
import './Card.css'

class Card extends Component {
  constructor(props) {
    super(props)

    let xPos = Math.random() * 40 - 20
    let yPos = Math.random() * 40 - 20
    let angle = Math.random() * 90 - 45
    // transform: translate(10px, 20px) rotate(20deg);
    this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`
  }

  render() {
    return (
      <img
        style={{ transform: this._transform }}
        className="Card"
        src={this.props.image}
        alt={this.props.name}
      />
    )
  }
}

/* export the component to be used in other components */
export default Card
