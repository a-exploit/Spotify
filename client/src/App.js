import React from 'react';
import './App.css';
import Landing from './components/Landing/Landing';
import SearchBar from './components/SearchBar/SearchBar';
import {useState} from 'react'
import Player from './components/Player/Player';
const App=()=> {
  const [query, setQuery] = useState('rock')
  const [trackToPlay, setTrackToPlay] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  return (
    <div className="App">
      <SearchBar setQuery={setQuery} setViewMode={setViewMode} />
      <Landing query={query} setTrackToPlay={setTrackToPlay} viewMode={viewMode} />
      <Player trackToPlay={trackToPlay}/>
    </div>
  );
}

export default App;
