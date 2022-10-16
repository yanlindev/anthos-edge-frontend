import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateVisibleClusters } from '../../redux/clusterSlice';
import './styles.scss';
import ShortFleetList from '../../components/ShortFleetList';
import FleetMetrics from '../../components/FleetMetrics';
import Map from '../../components/Map';
import Modal from '../../components/Modal';
import axios from 'axios';

const MonitoringPage = () => {
  const dispatch = useDispatch();
  const {clusterOnClick} = useSelector((state) => state.cluster);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  // const [fleetData, setFleetData] = useState([]);

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

  useEffect(() => {
    if(clusterOnClick) {
      setModalOpen(true);
    }
  }, [clusterOnClick])

  const handleCloseModal = () => {
    setActiveIndex(null);
    setModalOpen(false);
  }

  // get fleet data
  // useEffect(() => {
  //   let fleetData = data.map(data => {
  //     const {name, node_count, version} = data;
  //     const continent = data.labels.continent;
  //     return {name, node_count, version, continent};
  //   });
  //   setFleetData(fleetData);
  // }, [data])

  return (
    <div className='monitoring-page'>
      <Map
        data={data}
        modalClickable={true}
      />
      <div className='monitoring-page__panel'>
        <ShortFleetList
          data={data}
        />
        <FleetMetrics />
      </div>
      {
        modalOpen ?
        <Modal
          data={data.find(el => el.name === clusterOnClick)}
          handleClose={handleCloseModal}
        /> :
        null
      }
    </div>
  )
}

export default MonitoringPage;