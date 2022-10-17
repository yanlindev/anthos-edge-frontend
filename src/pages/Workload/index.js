import React, { useState, useEffect } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateVisibleClusters } from '../../redux/clusterSlice';
import VMManagement from '../../components/VMManagement/VMManagement';
import VMList from '../../components/VMList';
import Map from '../../components/Map';
import axios from 'axios';

const WorkloadPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    axios.get('https://edge-demo-fljjthbteq-uw.a.run.app/v1/abm/')
    .then(function (response) {
      // handle success
      dispatch(updateVisibleClusters(response.data));
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
          hoverIndex={hoverIndex}
          modalClickable={false}
        />
        <VMManagement />
      </div>
      <VMList />
    </div>
  )
}

export default WorkloadPage;