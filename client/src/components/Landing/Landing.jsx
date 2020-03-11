import React, { Component } from 'react'
import './Landing.css'

import Tile from '../Tile/Tile';
import Filter from '../Filter/Filter';
const axios = require('axios')
export default class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tracks: [],
            updatedTracks: [],
            popularityTracks: [],
            mixedTracks: [],
            page: 0,
            changed:false
        }
    }
    componentDidMount() {
        this.getTracks()
    }
    getTracks = (query=this.props.query) => {
        const params = this.getHashParams();
        const limit=8

        axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&offset=${this.state.page * 8}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${params.access_token}`
            }
        }).then((res) => {
            this.setState({
                tracks: res.data.tracks.items
                , mixedTracks: res.data.tracks.items
                , updatedTracks: res.data.tracks.items
                , popularityTracks: res.data.tracks.items
            })
        })
    }
    getTracksbyArtist = () => {
        const params = this.getHashParams();
        axios.get(`https://api.spotify.com/v1/search?q=artist:${this.props.query}&type=track&offset=${this.state.page * 8}&limit=8`, {
            headers: {
                'Authorization': `Bearer ${params.access_token}`
            }
        }).then((res) => {
            console.log(res)
            this.setState({
                tracks: res.data.tracks.items
                , mixedTracks: res.data.tracks.items
                , updatedTracks: res.data.tracks.items
                , popularityTracks: res.data.tracks.items
            })
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.query !== prevProps.query) {
            this.getTracksbyArtist()
            this.setState({changed:true})
        }
        if (prevState.page !== this.state.page) {
            if(this.state.changed)
                this.getTracksbyArtist()
            else
                this.getTracks()
        }

    }

    getHashParams = () => {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
    filterTracks = (filters) => {
        // console.log(filters)
        if (filters.length) {
            const filteredBools = this.state.tracks.map((track) => {
                return filters.every(v => track.available_markets.includes(v))
            })
            const filteredTracks = this.state.tracks.filter((track, index) => {
                return filteredBools[index]
            })
            this.setState({
                updatedTracks: filteredTracks
            }, function () {
                this.mixTracks()

            }.bind(this))
        }
        else {
            this.setState({
                updatedTracks: this.state.tracks
            }, function () {
                this.mixTracks()

            }.bind(this))
        }


    }
    filterTracksByPopularity = (filters) => {
        if (filters.length) {
            const max = Math.max(...filters)
            const min = Math.min(...filters)
            const filteredTracks = this.state.tracks.filter((track) => {
                return (track.popularity >= min && track.popularity <= max)
            })
            this.setState({
                popularityTracks: filteredTracks
            }, function () {
                this.mixTracks()

            }.bind(this))
        }
        else {
            this.setState({
                popularityTracks: this.state.tracks
            }, function () {
                this.mixTracks()

            }.bind(this))
        }

    }
    mixTracks = () => {
        var common = [];
        for (var i = 0; i < this.state.updatedTracks.length; ++i) {
            for (var j = 0; j < this.state.popularityTracks.length; ++j) {
                if (this.state.updatedTracks[i].name === this.state.popularityTracks[j].name) {
                    common.push(this.state.updatedTracks[i]);
                }
            }
        }
        this.setState({ mixedTracks: common })
    }
    onPageIncrement = () => {
        this.setState({ page: this.state.page + 1 })
    }
    onPageDecrement = () => {
        if(this.state.page!==0)
        this.setState({ page: this.state.page - 1 })
    }
    onPageChange = () => {
        this.setState({ page: this.state.page + 1 })
    }
    render() {
        return (
            <>
                <div className='landing-container'>
                    <div className='sidebar'>
                        <div className='countries-filter'>
                            <Filter countries filterTracks={this.filterTracks} />
                        </div>
                        <div className='popularity-filter'>
                            <Filter filterTracksByPopularity={this.filterTracksByPopularity} />
                        </div>
                    </div>
                    <div className='content-container'>
                        <h4>Page no : {this.state.page+1}</h4>
                    <div className='content'>
                    <button className='pagination' onClick={this.onPageDecrement}>Prev</button>
                    {this.state.mixedTracks.length?
                    <div className='tracks-grid'>
                        
                        {this.state.mixedTracks.map(track => {
                            return <Tile
                                album={track.album}
                                name={track.name}
                                artists={track.artists}
                                previewUrl={track.preview_url}
                                viewMode={this.props.viewMode}
                                setTrackToPlay={this.props.setTrackToPlay} />
                        })
                        }
                    </div>:(<h1>No tracks found for current filters</h1>)
    }
                    <button className='pagination' onClick={this.onPageIncrement}>Next</button>

                    </div>
                    </div>
                </div>
            </>
        )
    }
}
