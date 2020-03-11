import React, { Component } from 'react'
import './SearchBar.css'
import grid from '../../grid.png'
import list from '../../view.png'
import logo from '../../spotify.png'
export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
        }
    }
    componentDidMount() {

    }
    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }
    search = () => {
        if(this.state.search.length)
        this.props.setQuery(this.state.search)
        else
        alert('Enter an artist name....')
    }
    onEnter = (e) => {
        if (e.key === 'Enter')
            this.search()
    }
    onListClick = () => {
        const grids = document.querySelector('.tracks-grid')
        if (grids) {
            this.props.setViewMode('list')
            grids.classList.add('tracks-list')
            grids.classList.remove('tracks-grid')
        }
    }
    onGridClick = () => {
        const lists = document.querySelector('.tracks-list')
        if (lists) {
            this.props.setViewMode('grid')
            lists.classList.add('tracks-grid')
            lists.classList.remove('tracks-list')
        }
    }   
    redirectHome=()=>{
        window.location.reload(false);
    }
    render() {
        return (
            <div className='search-bar-container'>
                <div className='home-button' onClick={this.redirectHome}>
                <img src={logo} className='logo'/>&nbsp; Spotify
                </div>
                <input placeholder='Enter an artist name...' onChange={this.handleChange} value={this.state.search} onKeyPress={this.onEnter}></input>
                <button onClick={this.search}>Search!</button>
                <div className='image-container'>
                    <img src={grid} title='Grid View' onClick={this.onGridClick}></img>
                    <img src={list} title='List View' onClick={this.onListClick}></img>
                </div>
                <a href='http://localhost:8888'><button>Login</button></a>
            </div>
        )
    }
}
