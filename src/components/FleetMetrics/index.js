import React, { useState, useEffect } from 'react';
import Iframe from 'react-iframe';
import './styles.scss';
import fleetMetricsIcon from '../../assets/images/fleetInfo.svg';
import axios from 'axios';

const FleetMetrics = () => {
  const [urls, setUrls] = useState({});
  useEffect(() => {
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/testing/settings/fleet-monitoring')
    .then(function (response) {
      // handle success
      console.log(response.data);
      setUrls(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [])

  return (
    <div className='fleet-metrics'>
      <div className='fleet-metrics__title'>
        <img className='icon' src={fleetMetricsIcon} />
        <div className='text'>Fleet Metrics</div>
      </div>
      {/* {
        urls.overview.map(columns => (
          columns.map(url => (
            <iframe src={url} width="450" height="200" frameborder="0"></iframe>
          ))
        ))
      } */}
      <iframe src='http://34.70.222.156:3000/d-solo/UQ6us7S4k/overview?orgId=1&from=1665653365584&to=1665674965584&theme=light&panelId=2' width="450" height="200" frameborder="0"></iframe>
    </div>
  )
}

export default FleetMetrics;