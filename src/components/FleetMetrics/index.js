import React, { useState, useEffect } from 'react';
import './styles.scss';
import fleetMetricsIcon from '../../assets/images/fleetInfo.svg';

const FleetMetrics = () => {

  return (
    <div className='fleet-metrics'>
      <div className='fleet-metrics__title'>
        <img className='icon' src={fleetMetricsIcon} />
        <div className='text'>Fleet Metrics</div>
      </div>
    </div>
  )
}

export default FleetMetrics;