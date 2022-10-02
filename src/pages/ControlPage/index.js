import React, {useState, useEffect} from 'react';
import './styles.scss';
import ACM from '../../components/ACM/ACM';
import FleetList from '../../components/FleetList';
import Map from '../../components/Map';
import axios from 'axios';

const ControlPage = () => {
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
    <div className='control-page'>
      <div className='control-page__first-row'>
        <Map
          data={data}
        />
        <ACM />
      </div>
      <FleetList data={data} />
    </div>
  )
}

export default ControlPage;