import React, { Component } from 'react'
import './Tile.css'
import play from '../../record.png'
export default class Tile extends Component {
    constructor(props) {
        super(props)
    }
    //Play clicked track if preview url is provided
    setTrack=()=>{
        if(this.props.previewUrl)
        this.props.setTrackToPlay(this.props.previewUrl)
        else
        alert('No preview url for selected track!')
    }
    render() {
        return (
            <div className={`track-tile-${this.props.viewMode}`} onClick={this.setTrack} >
                <img src={this.props.album.images[1].url} />
                <div className='info-container'>
                <h2>{this.props.name}</h2>
                <div className='artists'>  
                {this.props.artists.map(artist => {
                   return <p>{artist.name},</p>
                })}
                </div>
                </div>
                <img src={play} className='play-button'></img>
            </div>
        )
    }
}
