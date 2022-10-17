import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateVisibleClusters } from '../../redux/clusterSlice';
import './styles.scss';
import ACM from '../../components/ACM/ACM';
import LongFleetList from '../../components/LongFleetList'
import Map from '../../components/Map';
import axios from 'axios';

const ControlPage = () => {
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

  const handleHoverIndex = index => {
    setHoverIndex(index);
  }

  return (
    <div className='control-page'>
      <div className='control-page__first-row'>
        <Map
          data={data}
          hoverIndex={hoverIndex}
          modalClickable={false}
        />
        <ACM />
      </div>
      <LongFleetList
        data={data}
        handleHoverIndex={handleHoverIndex}
      />
    </div>
  )
}

export default ControlPage;