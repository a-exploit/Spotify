import React, { Component } from 'react'
import './Player.css'
export default class Player extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='audio-player'>
                {this.props.trackToPlay ? (<audio
                    controls
                    autoPlay
                    src={this.props.trackToPlay}>
                </audio>) : null}

            </div>
        )
    }
}
