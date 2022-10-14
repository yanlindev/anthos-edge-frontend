import React, { useState, useEffect } from 'react';
import './styles.scss';
import VMManagement from '../../components/VMManagement/VMManagement';
import FleetLogs from '../../components/FleetLogs/FleetLogs';
import Map from '../../components/Map';
import axios from 'axios';

const WorkloadPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/testing/abm/')
    .then(function (response) {
      // handle success
      setData(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [])

  return (
    <div className='workload-page'>
      <div className='workload-page__first-row'>
        <Map
          data={data}
          // hoverIndex={hoverIndex}
          modalClickable={false}
        />
        <VMManagement />
      </div>
      <FleetLogs />
    </div>
  )
}

export default WorkloadPage;