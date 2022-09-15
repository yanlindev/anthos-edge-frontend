import React from 'react';
import './styles.scss';
import FleetList from '../../components/FleetList';
import FleetMetrics from '../../components/FleetMetrics';

const MonitoringPage = () => {
  return (
    <div className='monitoring-page'>
      <FleetList />
      <FleetMetrics />
    </div>
  )
}

export default MonitoringPage;