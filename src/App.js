import React, { Component } from 'react';
import MapContainer from './MapContainer';
import locations from './locations';


import { FaBars } from 'react-icons/fa';
import './App.css';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';


class App extends Component {
  state = {
    allLocations: {},
    query : '',
    toggleMenu: false,
  }

  componentWillMount() {
    this.setState({ allLocations : locations})
  }

  onToggleMenu = () => {
    this.setState({ toggleMenu: !this.state.toggleMenu})
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim()});
  }

  
  render() {
    const { allLocations, query } = this.state
    let showingLocations 
      if (query) {
        const match = new RegExp(escapeRegExp(query), 'i')
        showingLocations = allLocations.filter((location) => 
        match.test(location.name))
      } else {
        showingLocations = allLocations
      }
      showingLocations.sort(sortBy('name'));

    return (
      <div className="App">
        <header className="App-header">
          <h1>ZOMOTO API </h1>
          <button className="toggle-menu" onClick={this.onToggleMenu}><FaBars/></button>
        </header>
        <MapContainer toggleMenu={this.state.toggleMenu}
                      locations={showingLocations}
                      markers={showingLocations}
                      query={this.state.query}
                      onUpdateQuery={this.updateQuery}
                      onListItemClick={this.onListItemClick}
                      showDetails={this.state.showDetails}
                      selectedLocation={this.state.selectedLocation}
                      locationData={this.state.locationData}/>
      </div>
    );
  }
}

export default App;
