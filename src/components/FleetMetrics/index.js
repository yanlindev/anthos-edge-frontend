import React, { useState, useEffect } from 'react';
import './styles.scss';
import fleetMetricsIcon from '../../assets/images/fleetInfo.svg';
import axios from 'axios';

const FleetMetrics = () => {
  // const [urls, setUrls] = useState({});
  // useEffect(() => {
  //   axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/testing/settings/fleet-monitoring')
  //   .then(function (response) {
  //     // handle success
  //     console.log(response.data);
  //     setUrls(response.data);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   })
  // }, []);

  const grafanaLink = 'https://grafana-cr-fljjthbteq-uc.a.run.app/d-solo/c7hM3KSVz/fleet-metrics?orgId=1&from=1665626630153&to=1665636635057&panelId=';
  const links = [
    {
      title: 'Top CPU Utilization',
      link: grafanaLink + '6',
    },
    {
      title: 'Top Sent Traffic',
      link: grafanaLink + '2',
    },
    {
      title: 'Top Received Traffic',
      link: grafanaLink + '4',
    },
    {
      title: 'Top Read Throughput',
      link: grafanaLink + '8',
    },
    {
      title: 'Top Write Throughput',
      link: grafanaLink + '10',
    },
    {
      title: 'Customer Controller Manager Uptime',
      link: grafanaLink + '16',
    },
    {
      title: 'Top Firewall Dropped Traffic',
      link: grafanaLink + '18',
    },
    {
      title: 'Container Memory Usage',
      link: grafanaLink + '20',
    },
    {
      title: 'CPU Usage Per Container',
      link: grafanaLink + '22',
    },
  ]

  return (
    <div className='fleet-metrics'>
      <div className='fleet-metrics__title'>
        <img className='icon' src={fleetMetricsIcon} />
        <div className='text'>Fleet Metrics</div>
        <div className='label'>{links.length}</div>
      </div>
      <div className='fleet-metrics__iframe-wrapper'>
        {
          links.map(link => <Row data={link} />)
        }
      </div>
    </div>
  )
}

const Row = props => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={`fleet-metrics__iframe-row ${expanded ? 'is-expanded' : ''}`}>
      <div className='fleet-metrics__iframe-row__title' onClick={() => {setExpanded(!expanded)}}>
        <div>{props.data.title}</div>
      </div>
      <div className='fleet-metrics__iframe-row__iframe-wrapper'>
        <iframe src={props.data.link}></iframe>
      </div>
    </div>
  )
}

export default FleetMetrics;