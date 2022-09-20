import React from 'react';
import './styles.scss';
import FleetList from '../../components/FleetList';
import FleetMetrics from '../../components/FleetMetrics';
import Map from '../../components/Map';

const MonitoringPage = () => {
  return (
    <div className='monitoring-page'>
      <Map />
      <div className='monitoring-page__panel'>
        <FleetList />
        <FleetMetrics />
      </div>
    </div>
  )
}

export default MonitoringPage;