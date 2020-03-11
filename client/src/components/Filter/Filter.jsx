import React, { Component } from 'react'
import './Filter.css'
import countries from './countries.json'
export default class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            filters: [],
        }
    }
    componentDidMount() {
        if (this.props.countries) {
            this.setState({ list: countries })
        }
        else {
            this.setState({
                list: [
                    { Code: '0', Name: "None" },
                    { Code: '25', Name: "Low Popularity" },
                    { Code: '50', Name: "Medium Popularity" },
                    { Code: '100', Name: "High Popularity" },
                ]
            })
        }
    }
    filter = (e) => {
        if (!this.state.filters.includes(e.target.value)) {
            this.setState({
                filters: [...this.state.filters, e.target.value]
            }, function () {
                if (this.props.countries)
                    this.props.filterTracks(this.state.filters)
                else
                    this.props.filterTracksByPopularity(this.state.filters)
            }.bind(this))
        }
        else {
            const index = this.state.filters.indexOf(e.target.value)
            this.setState({
                filters: [...this.state.filters.slice(0, index), ...this.state.filters.slice(index + 1)]
            }, function () {
                if (this.props.countries)
                    this.props.filterTracks(this.state.filters)
                else
                    this.props.filterTracksByPopularity(this.state.filters)
            }.bind(this))
        }
    }
    filterPage = () => {
        if (this.props.countries)
            this.props.filterTracks(this.state.filters)
        else
            this.props.filterTracksByPopularity(this.state.filters)
    }
    render() {
        return (
            <div className='filter-choices' id='scroll'>
                {this.props.countries ? (<h4>Marketplace in which the track is available</h4>) : (<h4>Filter by Popularity</h4>)}

                {this.state.list.map(item => {
                    return <label><input onClick={this.filter} type="checkbox" name="favorite_pet" value={item.Code} />{item.Name}<br /></label>
                })}
            </div>
        )
    }
}
