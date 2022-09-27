import React, { useState, useEffect } from 'react';
import Iframe from 'react-iframe';
import './styles.scss';
import fleetMetricsIcon from '../../assets/images/fleetInfo.svg';

const FleetMetrics = () => {

  return (
    <div className='fleet-metrics'>
      <div className='fleet-metrics__title'>
        <img className='icon' src={fleetMetricsIcon} />
        <div className='text'>Fleet Metrics</div>
        {/* <Iframe url="http://34.170.231.75:3000/d/k8s_views_global/kubernetes-views-global?orgId=1&refresh=30s&from=1664232237716&to=1664235837716&theme=light"
        width="640px"
        height="320px"
        id=""
        className=""
        display="block"
        position="relative"
        /> */}
        {/* <iframe src="http://34.170.231.75:3000/d/k8s_views_global/kubernetes-views-global?orgId=1&refresh=30s&from=1664232237716&to=1664235837716&theme=light" width="450" height="200" frameborder="0"></iframe> */}
        {/* <embedded-webview src="http://34.170.231.75:3000/d/k8s_views_global/kubernetes-views-global?orgId=1&refresh=30s&from=1664232237716&to=1664235837716&theme=light"></embedded-webview> */}
      </div>
      <iframe src="http://34.170.231.75:3000/d-solo/k8s_views_nodes/kubernetes-views-nodes?orgId=1&refresh=30s&from=1664234291204&to=1664237891204&panelId=24" width="450" height="200" frameborder="0"></iframe>
    </div>
  )
}

export default FleetMetrics;