import React, { useState, useEffect } from 'react';
import fleetInfoIcon from '../../assets/images/fleetInfo.svg';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './styles.scss';
import axios from 'axios';

const FleetList = () => {
  const [fleetData, setFleetData] = useState([]);

  useEffect(() => {
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/testing/abm/')
    .then(function (response) {
      // handle success
      console.log(response);
      setTimeout(() => {
        setFleetData(response.data);
      }, 500);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [])

  return (
    <div className='fleet-list'>
      <div className='fleet-list__title'>
        <img className='icon' src={fleetInfoIcon} />
        <div className='text'>Fleet Information</div>
        <div className='label'>{fleetData.length}</div>
      </div>

      <table className='fleet-list__inner'>
        <tr>
          <th>Name</th>
          <th>Cluster</th>
          <th>Version</th>
        </tr>
        {
          fleetData.length > 0 ?
          fleetData.map(data => (
            <tr>
              <td>{data.location}</td>
              <td>{data.node_count}</td>
              <td>{data.version}</td>
            </tr>
          )) :
          <SkeletonTheme>
            <td><Skeleton count={8} height={30} /></td>
            <td><Skeleton count={8} height={30} /></td>
            <td><Skeleton count={8} height={30} /></td>
          </SkeletonTheme>
        }
      </table>
    </div>
  )
}

export default FleetList;