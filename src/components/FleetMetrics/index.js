import React, { useState, useEffect } from 'react';
import './styles.scss';
import fleetMetricsIcon from '../../assets/images/fleetInfo.svg';
import axios from 'axios';

const FleetMetrics = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/v1/settings/fleet-monitoring')
    .then(function (response) {
      setUrls(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  return (
    <div className='fleet-metrics'>
      <div className='fleet-metrics__title'>
        <img className='icon' src={fleetMetricsIcon} />
        <div className='text'>Fleet Metrics</div>
        <div className='label'>{urls.length}</div>
      </div>
      <div className='fleet-metrics__iframe-wrapper'>
        {
          urls.map((url, index) => <Row url={url} index={index} />)
        }
      </div>
    </div>
  )
}

const Row = props => {
  const [expanded, setExpanded] = useState(true);

  const titles = [
    'Top CPU Utilization',
    'Top Sent Traffic',
    'Top Received Traffic',
    'Top Read Throughput',
    'Top Write Throughput',
    'Customer Controller Manager Uptime',
    'Top Firewall Dropped Traffic',
    'Container Memory Usage',
    'CPU Usage Per Container'
  ];

  return (
    <div className={`fleet-metrics__iframe-row ${expanded ? 'is-expanded' : ''}`}>
      <div className='fleet-metrics__iframe-row__title' onClick={() => {setExpanded(!expanded)}}>
        <div>{titles[props.index]}</div>
      </div>
      <div className='fleet-metrics__iframe-row__iframe-wrapper'>
        <iframe src={props.url}></iframe>
      </div>
    </div>
  )
}

export default FleetMetrics;