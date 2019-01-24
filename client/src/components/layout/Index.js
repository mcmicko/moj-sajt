import React, { Component } from 'react'
import Showcase from './Showcase';
import SectionOne from './SectionOne';

class Index extends Component {
  render() {
    return (
      <div>
        <Showcase/>
        <SectionOne/>
      </div>
    )
  }
}

export default Index;