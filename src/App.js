import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import summary from '../src/apis/summary';
import 'mapbox-gl/dist/mapbox-gl.css';

import Header from './components/Header';
import DashBoard from './components/DashBoard';
import LeafletMap from './components/LeafletMap';

class App extends Component {
  state = {
    showFullMap: true,
    sites: [],
    selectSite: null,
    metrics: [
      { title: 'Countries', count: 10 },
      { title: 'Projects', count: 2 },
      { title: 'Users', count: 20 },
      { title: 'Sites', count: null },
      { title: 'Transects', count: 5 },
      { title: 'Avg Coral Coverage', count: 12 }
    ]
  };

  async componentDidMount() {
    const {
      data: { features: sites }
    } = await summary.post('/sites/', { project_id: '2c56b92b-ba1c-491f-8b62-23b1dc728890' }); //this filter bases on this sample project id for the front end
    const { metrics } = this.state;
    metrics[3].count = sites.length;

    this.setState({ sites: sites });
    this.setState({ metrics });
  }

  toggle = () => {
    this.setState({ showFullMap: !this.state.showFullMap });
  };

  siteSelectHandler = selectedOption => {
    this.setState({ selectSite: selectedOption });
  };

  render() {
    return (
      <BrowserRouter>
        <Header toggle={this.toggle} />
        <LeafletMap geoObject={this.state.sites} />
        <DashBoard
          sites={this.state.sites}
          siteSelectHandler={this.siteSelectHandler}
          selectSite={this.state.selectSite}
          showFullMap={this.state.showFullMap}
          metrics={this.state.metrics}
        />
      </BrowserRouter>
    );
  }
}

export default App;
