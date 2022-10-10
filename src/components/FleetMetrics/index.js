import React, { useState, useEffect } from 'react';
import Iframe from 'react-iframe';
import './styles.scss';
import fleetMetricsIcon from '../../assets/images/fleetInfo.svg';

const FleetMetrics = () => {
  // useEffect(() => {
  //   document.querySelector('iframe').querySelector("div.css-keyl2d").style.color = "red";
  // }, []);

  return (
    <div className='fleet-metrics'>
      <div className='fleet-metrics__title'>
        <img className='icon' src={fleetMetricsIcon} />
        <div className='text'>Fleet Metrics</div>
      </div>
      {/* <div className='fleet-metrics__iframe-wrapper'>
        <iframe className='fleet-metrics__iframe' src="http://34.170.231.75:3000/d/k8s_views_global/kubernetes-views-global?orgId=1&refresh=30s&from=1665119674133&to=1665123274133&theme=light"></iframe>
      </div> */}
      <iframe src="http://34.170.231.75:3000/d-solo/k8s_views_global/kubernetes-views-global?orgId=1&refresh=30s&panelId=72" width="450" height="200" frameborder="0"></iframe>
    </div>
  )
}

export default FleetMetrics;