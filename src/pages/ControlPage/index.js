import React from 'react';
import './styles.scss';
import ACM from '../../components/ACM/ACM';
import FleetList from '../../components/FleetList';
import Map from '../../components/Map';

const ControlPage = () => {
  return (
    <div className='control-page'>
      <div className='control-page__first-row'>
        <Map />
        <ACM />
      </div>
      <FleetList />
    </div>
  )
}

export default ControlPage;